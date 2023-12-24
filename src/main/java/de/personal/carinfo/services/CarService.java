package de.personal.carinfo.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.personal.carinfo.objects.CarBuilder;
import de.personal.carinfo.repos.CarRepository;

@Service
public class CarService {
	private Logger logger = LoggerFactory.getLogger(CarService.class);
	
	@Autowired
	private CarRepository carRepo;

	public void readCarDataFromCSV(boolean header) {
		String path = "src/main/resources/fakecardata.csv", line;
		String[] information = new String[19];
		CarBuilder carBuilder = new CarBuilder();

		try (BufferedReader br = Files.newBufferedReader(Paths.get(path), StandardCharsets.ISO_8859_1)) {
			if (header) {
				line = br.readLine();
			}
			
			while ((line = br.readLine()) != null) {
				information = line.split(";", 19);
				
				carBuilder.withModel(information[0].replace("\"", ""));
				carBuilder.withBrand(information[1].replace("\"", ""));
				carBuilder.withIndicator(information[2].replace("\"", ""));
				carBuilder.withModelFamily(information[3].replace("\"", ""));
				
				if (information[4] != "") {
					carBuilder.withLaunchDate(LocalDate.parse(getDateFromGermanDateFormat(information[4])));
				}
				
				carBuilder.withModelYear(Integer.parseInt(information[5].replace("\"", "")));
				carBuilder.withDevelopmentType(information[6].replace("\"", ""));
				carBuilder.withModelStatus(information[7].replace("\"", ""));
				carBuilder.withSegment(information[8].replace("\"", ""));
				carBuilder.withCarBodyType(information[9].replace("\"", ""));
				carBuilder.withCarBodySpecification(information[10].replace("\"", ""));
				carBuilder.withEngineType(information[11].replace("\"", ""));
				carBuilder.withCarProject(information[12].replace("\"", ""));
				carBuilder.withLimitation(information[13].replace("\"", ""));
				carBuilder.withUUID(information[14].replace("\"", ""));
				carBuilder.withSisterModelOne(information[15].replace("\"", ""));
				carBuilder.withSisterModelTwo(information[16].replace("\"", ""));
				carBuilder.withModelType(information[17].replace("\"", ""));
				carBuilder.withBaseCar(information[18].replace("\"", ""));
					
				this.carRepo.save(carBuilder.build());
			}
			
			this.logger.info("Car data import successfully finished!");
			
		} catch (IOException e) {
			this.logger.info("Error occurred during car data import!");
		}
	}

	public String getDateFromGermanDateFormat(String dateAsString) {
		String[] information = dateAsString.replace("\"", "").split("\\.");
		return information[2] + "-" + information[1] + "-" + information[0];
	}
}
