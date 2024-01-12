package de.personal.carinfo.services;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import de.personal.carinfo.objects.Person;
import de.personal.carinfo.objects.PersonBuilder;
import de.personal.carinfo.objects.Role;
import de.personal.carinfo.repos.CarRepository;
import de.personal.carinfo.repos.PersonRepository;

@Service
public class PersonService {
	private Logger logger = LoggerFactory.getLogger(CarService.class);
	private BCryptPasswordEncoder bCryptEncoder = new BCryptPasswordEncoder(4);
	
	@Autowired
	private PersonRepository personRepo;

	@Autowired
	private CarRepository carRepo;
	
	public void readPersonDataFromCSV(boolean header) {
		String path = "src/main/resources/fakepersondata.csv", line;
		String[] information = new String[16], tempArray = new String[2];
		PersonBuilder personBuilder = new PersonBuilder();
		long randomId;

		try (BufferedReader br = new BufferedReader(new FileReader(path))) {
			if (header) {
				br.readLine();
			}
			
			createAdmin();
			
			while ((line = br.readLine()) != null) {
				information = line.split(";");
				
				randomId = Long.parseLong(information[1]);
				while (this.personRepo.findById(randomId).orElse(null) != null) {
					randomId = generateRandomId(7);
				}
				
				personBuilder.withId(randomId);
				personBuilder.withSalutation(standardizeSalutation(information[2]));
				personBuilder.withFirstName(information[3]);
				personBuilder.withSecondName(information[4]);
				personBuilder.withBirthDate(formatDate(information[5]));
				
				if (information[7].isEmpty()) {
					tempArray = splitAddressAndHouseNumber(information[6]);
					information[6] = tempArray[0];
					information[7] = tempArray[1];
				}
				
				personBuilder.withAddress(standardizeTheWordStreet(information[6]));
				personBuilder.withHouseNumber(information[7]);

				if (information[8].isEmpty()) {
					tempArray = splitCombinedAreaCodeAndArea(information[9]);
					information[8] = tempArray[0];
					information[9] = tempArray[1];
				}
				
				personBuilder.withAreaCode(information[8]);
				personBuilder.withArea(information[9]);
				personBuilder.withEmail(information[10]);

				information[11] = "wahr".equals(information[11]) ? "true" : "false";
				personBuilder.withDeactivated(Boolean.parseBoolean(information[11]));
				
				personBuilder.withDateOfEntry(formatDate(information[12]));
				personBuilder.withCompany(information[13]);
				
				personBuilder.withCar(this.carRepo.findById(Long.parseLong(information[14])).orElse(null));
				personBuilder.withPassword(this.bCryptEncoder.encode(information[15]));
				personBuilder.withRole(Role.USER);

				this.personRepo.save(personBuilder.build());
			}
			
			this.logger.info("Person data import successfully finished!");
				
		} catch (IOException e) {
			this.logger.error("Error occurred during person data import!");
		}
	}
	
	private void createAdmin() {
		try {
			Person admin = new Person(9999999L, standardizeSalutation(""), "Adam", "Admin",
					LocalDate.parse("1980-12-31"), "Adminstr.", "1a", "38120", "Braunschweig",
					"adminno1@fakemail.com", false, LocalDate.parse("2000-01-01"),
					"NA", this.bCryptEncoder.encode("1234"), Role.ADMIN,
					this.carRepo.findById(6306L).orElse(null));
			this.personRepo.save(admin);
			
			this.logger.info("Admin successfully created!");
		} catch (Exception e) {
			this.logger.error("Error occurred during admin creation!");
		}
	}
	
	private String[] splitCombinedAreaCodeAndArea(String input) {
		return input.split(" ", 2);
	}
	
	private String[] splitAddressAndHouseNumber(String input) {
		String[] temp = input.split("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)");
		String[] output = { "", "" };
		int threshold = -1;

		for (int i = 0; i < temp.length; i++) {
			if (isNumeric(temp[i])) {
				threshold = i;
			}
		}

		if (threshold != -1) {
			for (int i = 0; i < temp.length; i++) {
				if (i < threshold) {
					output[0] = temp[i].strip() + " ";
				} else {
					output[1] = output[1] + "" + temp[i].strip();
				}
			}
		}

		return output;
	}
	
	private boolean isNumeric(String str) {
		try {
			Integer.parseInt(str);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
	
	private String standardizeTheWordStreet(String input) {
		String output = input;
		if (input.contains("strasse")) {
			output = output.replace("strasse", "str.");
		} else if (input.contains("straße")) {
			output = output.replace("straße", "str.");
		} else if (input.contains("Strasse")) {
			output = output.replace("Strasse", "Str.");
		} else if (input.contains("Straße")) {
			output = output.replace("Straße", "Str.");
		}

		return output;
	}
	
	private String standardizeSalutation(String input) {
		if (input.isEmpty() || input == null) {
			return "k.A.";
		} else {
			return input;
		}
	}

	private Long generateRandomId(int digits) {
		long randomNumber;
		int min, max = 1;
		for (int i = 0; i < digits; i++) {
			max *= 10;
		}

		min = max / 10;
		randomNumber = (int) ((Math.random() * (max - min) + min));

		return randomNumber;
	}
	
	private LocalDate formatDate(String dateString) {
		if (dateString.isEmpty() || dateString == null) {
			return LocalDate.parse("9999-12-31");
		} else {
			if (dateString.length() < 8) {
				return LocalDate.parse(dateString.substring(3) + "-" + dateString.substring(1, 3) 
					+ "-0" + dateString.substring(0, 1));
			} else {
				return LocalDate.parse(dateString.substring(4) + "-" + dateString.substring(2, 4) + "-"
					+ dateString.substring(0, 2));
			}
		}
	}
	
	public boolean personExistsInDatabase(String eMail) {
		return this.personRepo.findByEmail(eMail).orElse(null) == null ? false : true;
	}
	
	public boolean personIsDeactivated(String eMail) {
		Person person = this.personRepo.findByEmail(eMail).orElse(null);
		
		if (person == null || person.isDeactivated()) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * Checks password to ensure that it contains one small letter, one capital letter, and one digit. 
	 * Morever, it ensures that no dollar sign, semicolon or commas are included. Finally, the minimum length
	 * is set to 4 and the maximum length to 8 characters.
	 * 
	 * @param password	the password to check.
	 * 
	 * @return true, if valid password.
	 */
    public boolean isValidPassword(String password) {
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^\\s$;,]{4,8}$";
        Pattern p = Pattern.compile(regex);
 
        if (password != null) {
            Matcher m = p.matcher(password);
            return m.matches();
        }
        
        return false;
    }
	
	public Person createNewPerson(Map<String, String> dataMap) {
		PersonBuilder personBuilder = new PersonBuilder();
		
		if (personExistsInDatabase(dataMap.get("email"))) {
			this.logger.warn("Mail is already in use.");
			return null;
		}

		long randomId = generateRandomId(7);
		while (this.personRepo.findById(randomId).orElse(null) != null) {
			randomId = generateRandomId(7);
		}
		
		if (!isValidPassword(dataMap.get("password"))) {
			this.logger.warn("Invalid password.");
			return null;
		} else {
			personBuilder.withPassword(this.bCryptEncoder.encode(dataMap.get("password")));
		}

		try {
			personBuilder.withBirthDate(LocalDate.parse(dataMap.get("birthDate")));
		} catch (Exception e) {
			this.logger.warn("Invalid date format.");
			return null;
		}
		
		personBuilder.withId(randomId);
		personBuilder.withDateOfEntry(LocalDate.now());
		personBuilder.withRole(Role.USER);
		personBuilder.withEmail(dataMap.get("email"));
		personBuilder.withFirstName(dataMap.get("firstName"));
		personBuilder.withSecondName(dataMap.get("secondName"));
		personBuilder.withAddress(dataMap.get("address"));
		personBuilder.withHouseNumber(dataMap.get("houseNumber"));
		personBuilder.withAreaCode(dataMap.get("areaCode"));
		personBuilder.withArea(dataMap.get("area"));

		if (dataMap.get("salutation") != null) {
			personBuilder.withSalutation(dataMap.get("salutation"));
		} else {
			personBuilder.withSalutation("k.A.");
		}

		if (dataMap.get("company") != null) {
			personBuilder.withCompany(dataMap.get("company"));
		} else {
			personBuilder.withCompany("k.A.");
		}

		return personBuilder.build();
	}
	
	public Person editPersonData(Map<String, String> dataMap) {
		PersonBuilder personBuilder = new PersonBuilder();

		Person existingPerson = this.personRepo.findByEmail(dataMap.get("oldEmail")).orElse(null);
		personBuilder = takeOverCurrentInformation(existingPerson);
		
		try {
			personBuilder.withBirthDate(LocalDate.parse(dataMap.get("birthDate")));
		} catch (Exception e) {
			this.logger.warn("Invalid date format.");
			return null;
		}

		personBuilder.withFirstName(dataMap.get("firstName"));
		personBuilder.withSecondName(dataMap.get("secondName"));
		personBuilder.withBirthDate(LocalDate.parse(dataMap.get("birthDate")));
		personBuilder.withAddress(dataMap.get("address"));
		personBuilder.withHouseNumber(dataMap.get("houseNumber"));
		personBuilder.withAreaCode(dataMap.get("areaCode"));
		personBuilder.withArea(dataMap.get("area"));
		personBuilder.withEmail(dataMap.get("newEmail"));

		if (dataMap.get("salutation") != null) {
			personBuilder.withSalutation(dataMap.get("salutation"));
		} else {
			personBuilder.withSalutation("k.A.");
		}

		if (dataMap.get("company") != null) {
			personBuilder.withCompany(dataMap.get("company"));
		} else {
			personBuilder.withCompany("k.A.");
		}

		return personBuilder.build();
	}
	
	public Person changePersonsPassword(String eMail, String newPassword) {
		Person existingPerson = this.personRepo.findByEmail(eMail).orElse(null);
		PersonBuilder personBuilder = takeOverCurrentInformation(existingPerson);
		personBuilder.withPassword(newPassword);
		return personBuilder.build();
	}
	
	private PersonBuilder takeOverCurrentInformation(Person person) {
		PersonBuilder personBuilder = new PersonBuilder();
		
		personBuilder.withId(person.getId());
		personBuilder.withSalutation(person.getSalutation());
		personBuilder.withFirstName(person.getFirstName());
		personBuilder.withSecondName(person.getSecondName());
		personBuilder.withBirthDate(person.getBirthDate());
		personBuilder.withAddress(person.getAddress());
		personBuilder.withHouseNumber(person.getHouseNumber());
		personBuilder.withAreaCode(person.getAreaCode());
		personBuilder.withArea(person.getArea());
		personBuilder.withEmail(person.getEmail());
		personBuilder.withDeactivated(person.isDeactivated());
		personBuilder.withDateOfEntry(person.getDateOfEntry());
		personBuilder.withCompany(person.getCompany());
		personBuilder.withCar(person.getCar());
		personBuilder.withPassword(person.getPassword());
		personBuilder.withRole(person.getRole());
		
		return personBuilder;
	}

	public Map<String, String> createDataMappingForPersonCreation(String firstName, String secondName,
			String birthDate, String address, String houseNumber, String areaCode, String area, String email,
			String password, String salutation, String company) {
		Map<String, String> mapping = new HashMap<>();

		mapping.put("firstName", firstName);
		mapping.put("secondName", secondName);
		mapping.put("birthDate", birthDate);
		mapping.put("address", address);
		mapping.put("houseNumber", houseNumber);
		mapping.put("areaCode", areaCode);
		mapping.put("area", area);
		mapping.put("email", email);
		mapping.put("password", password);
		mapping.put("salutation", salutation);
		mapping.put("company", company);

		return mapping;
	}
	
	public Map<String, String> createDataMappingForPersonDataEdit(String firstName, String secondName,
			String birthDate, String address, String houseNumber, String areaCode, String area, 
			String oldEmail, String newEmail, String salutation, String company) {
		Map<String, String> mapping = new HashMap<>();

		mapping.put("firstName", firstName);
		mapping.put("secondName", secondName);
		mapping.put("birthDate", birthDate);
		mapping.put("address", address);
		mapping.put("houseNumber", houseNumber);
		mapping.put("areaCode", areaCode);
		mapping.put("area", area);
		mapping.put("oldEmail", oldEmail);
		mapping.put("newEmail", newEmail);
		mapping.put("salutation", salutation);
		mapping.put("company", company);

		return mapping;
	}
}
