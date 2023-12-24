package de.personal.carinfo.services;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;

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
	private BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(4);
	
	@Autowired
	private PersonRepository personRepo;

	@Autowired
	private CarRepository carRepo;
	
	public void readPersonDataFromCSV(boolean header) {
		String path = "src/main/resources/Personendaten.csv", line;
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
				
				personBuilder.withCar(this.carRepo.findById(Long.parseLong(information[14])).get());
				personBuilder.withPassword(information[15]);
				personBuilder.withRole(Role.USER);

				this.personRepo.save(personBuilder.build());
			}
			
			this.logger.info("Person data import successfully finished!");
				
		} catch (IOException e) {
			this.logger.info("Error occurred during person data import!");
		}

	}
	
	private void createAdmin() {
		try {
			Person admin = new Person(9999999L, standardizeSalutation(""), "Adam", "Admin",
					LocalDate.parse("1980-12-31"), "Adminstr.", "1a", "38120", "Braunschweig",
					"adminno1@fakemail.com", false, LocalDate.parse("2000-01-01"),
					"NA", this.bcryptEncoder.encode("1234"), Role.ADMIN, this.carRepo.findById(6306L).get());
			this.personRepo.save(admin);
			
			this.logger.info("Admin successfully created!");
		} catch (Exception e) {
			this.logger.info("Error occurred during admin creation!");
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
}
