package de.personal.carinfo.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.personal.carinfo.objects.Car;
import de.personal.carinfo.objects.CarBuilder;
import de.personal.carinfo.objects.Person;
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
			this.logger.warn("Error occurred during car data import!");
		}
	}

	private String getDateFromGermanDateFormat(String dateAsString) {
		String[] information = dateAsString.replace("\"", "").split("\\.");
		return information[2] + "-" + information[1] + "-" + information[0];
	}
	
	public List<Car> mergeLists(List<Car> listOne, List<Car> listTwo) {
		List<Car> resultList = new ArrayList<>();
		if (listOne.isEmpty()) {
			resultList.addAll(listTwo);
		} else {
			for (Car car : listTwo) {
				if (listOne.contains(car)) {
					resultList.add(car);
				}
			}			
		}
		return resultList;
	}
	
	public Map<String, Integer> countElementsPerFeature(List<Person> list, String feature) {
		Map<String, Integer> resultMap = new HashMap<String, Integer>();
		int count;
		
		switch (feature) {
		case "model":
			for (Person listItem : list) {
				if (listItem.getCar() != null) {
					if (!resultMap.containsKey(listItem.getCar().getModel())) {
						resultMap.put(listItem.getCar().getModel(), 1);
					} else {
						count = resultMap.get(listItem.getCar().getModel());
						resultMap.put(listItem.getCar().getModel(), count + 1);
					}
				}
			}
			break;
		case "brand":
			for (Person listItem : list) {
				if (listItem.getCar() != null) {
					if (!resultMap.containsKey(listItem.getCar().getBrand())) {
						resultMap.put(listItem.getCar().getBrand(), 1);
					} else {
						count = resultMap.get(listItem.getCar().getBrand());
						resultMap.put(listItem.getCar().getBrand(), count + 1);
					}
				}
			}
			break;
		case "engineType":
			for (Person listItem : list) {
				if (listItem.getCar() != null) {
					if (!resultMap.containsKey(listItem.getCar().getEngineType())) {
						resultMap.put(listItem.getCar().getEngineType(), 1);
					} else {
						count = resultMap.get(listItem.getCar().getEngineType());
						resultMap.put(listItem.getCar().getEngineType(), count + 1);
					}
				}
			}
			break;
		case "modelFamily":
			for (Person listItem : list) {
				if (listItem.getCar() != null) {
					if (!resultMap.containsKey(listItem.getCar().getModelFamily())) {
						resultMap.put(listItem.getCar().getModelFamily(), 1);
					} else {
						count = resultMap.get(listItem.getCar().getModelFamily());
						resultMap.put(listItem.getCar().getModelFamily(), count + 1);
					}
				}
			}
			break;
		case "carBodyType":
			for (Person listItem : list) {
				if (listItem.getCar() != null) {
					if (!resultMap.containsKey(listItem.getCar().getCarBodyType())) {
						resultMap.put(listItem.getCar().getCarBodyType(), 1);
					} else {
						count = resultMap.get(listItem.getCar().getCarBodyType());
						resultMap.put(listItem.getCar().getCarBodyType(), count + 1);
					}
				}
			}
			break;
		case "segment":
			for (Person listItem : list) {
				if (listItem.getCar() != null) {
					if (!resultMap.containsKey(listItem.getCar().getSegment())) {
						resultMap.put(listItem.getCar().getSegment(), 1);
					} else {
						count = resultMap.get(listItem.getCar().getSegment());
						resultMap.put(listItem.getCar().getSegment(), count + 1);
					}
				}
			}
			break;
		}
		
		return resultMap;
	}
	
	public Map<String, Integer> sortMapByValues(Map<String, Integer> unsortedMap, boolean sortAscending) {
		if (sortAscending) {
			return unsortedMap.entrySet().stream()
                    .sorted(Map.Entry.comparingByValue())
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                    		(e1, e2) -> e1, LinkedHashMap::new));
		} else {
			return unsortedMap.entrySet().stream()
                    .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                    		(e1, e2) -> e1, LinkedHashMap::new));
		}
	}
	
	public List<Integer> getThreeHighestValuesInMap(Map<String, Integer> descendingSortedMap) {
		List<Integer> resultList = new ArrayList<>();
		while (resultList.size() < 3) {
			for (Integer value : descendingSortedMap.values()) {
				if (!resultList.contains(value)) {
					resultList.add(value);
				}
			}
		}
		return resultList;
	}
}
