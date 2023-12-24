package de.personal.carinfo.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.personal.carinfo.objects.Car;
import de.personal.carinfo.repos.CarRepository;
import de.personal.carinfo.services.CarService;

@RestController
public class CarController {
	@Autowired
	private CarRepository carRepo;
	
	@Autowired
	private CarService carService;
	
	@GetMapping("/cars/filterByFeature")
	public List<Car> getCarsByFeature(
			@RequestParam(value = "feature", defaultValue = "", required = false) String feature,
			@RequestParam(value = "value", defaultValue = "", required = false) String value) {
		
		List<String> allowedFeatures = new ArrayList<>(Arrays.asList("id", "model", "brand", "indicator",
				"modelFamily", "developmentType", "modelStatus", "segment", "carBodyType", "carBodySpecification",
				"engineType", "carProject", "limitation", "uuid", "sisterModelOne", "sisterModelTwo", "modelType",
				"baseCar"));
		List<Car> resultList = new ArrayList<>();
		
		if (allowedFeatures.contains(feature)) {
			switch (feature) {
			case "id":
				resultList = this.carRepo.findAllById(Long.parseLong(value));
				break;
			case "model":
				resultList = this.carRepo.findAllByModel(value);
				break;
			case "brand":
				resultList = this.carRepo.findAllByBrand(value);
				break;
			case "indicator":
				resultList = this.carRepo.findAllByIndicator(value);
				break;
			case "modelFamily":
				resultList = this.carRepo.findAllByModelFamily(value);
				break;
			case "developmentType":
				resultList = this.carRepo.findAllByDevelopmentType(value);
				break;
			case "modelStatus":
				resultList = this.carRepo.findAllByModelStatus(value);
				break;
			case "segment":
				resultList = this.carRepo.findAllBySegment(value);
				break;
			case "carBodyType":
				resultList = this.carRepo.findAllByCarBodyType(value);
				break;
			case "carBodySpecification":
				resultList = this.carRepo.findAllByCarBodySpecification(value);
				break;
			case "engineType":
				resultList = this.carRepo.findAllByEngineType(value);
				break;
			case "carProject":
				resultList = this.carRepo.findAllByCarProject(value);
				break;
			case "limitation":
				resultList = this.carRepo.findAllByLimitation(value);
				break;
			case "uuid":
				resultList = this.carRepo.findAllByUuid(value);
				break;
			case "sisterModelOne":
				resultList = this.carRepo.findAllBySisterModelOne(value);
				break;
			case "sisterModelTwo":
				resultList = this.carRepo.findAllBySisterModelTwo(value);
				break;
			case "modelType":
				resultList = this.carRepo.findAllByModelType(value);
				break;
			case "baseCar":
				resultList = this.carRepo.findAllByBaseCar(value);
				break;
			}
		}
		return resultList; 
	}
	
	@GetMapping("/cars/fullTextSearch")
    public List<Car> getCarsByFullTextSearch(
            @RequestParam(value = "text", defaultValue = "", required = false) String text,
            @RequestParam(value = "id", defaultValue = "", required = false) String id,
            @RequestParam(value = "model", defaultValue = "", required = false) String model,
            @RequestParam(value = "brand", defaultValue = "", required = false) String brand,
            @RequestParam(value = "indicator", defaultValue = "", required = false) String indicator,
            @RequestParam(value = "modelFamily", defaultValue = "", required = false) String modelFamily,
            @RequestParam(value = "launchDate", defaultValue = "", required = false) String launchDate,
            @RequestParam(value = "modelYear", defaultValue = "", required = false) String modelYear,
            @RequestParam(value = "developmentType", defaultValue = "", required = false) String developmentType,
            @RequestParam(value = "modelStatus", defaultValue = "", required = false) String modelStatus,
            @RequestParam(value = "segment", defaultValue = "", required = false) String segment,
            @RequestParam(value = "carBodyType", defaultValue = "", required = false) String carBodyType,
            @RequestParam(value = "carBodySpec", defaultValue = "", required = false) String carBodySpecification,
            @RequestParam(value = "engineType", defaultValue = "", required = false) String engineType,
            @RequestParam(value = "carProject", defaultValue = "", required = false) String carProject,
            @RequestParam(value = "limitation", defaultValue = "", required = false) String limitation,
            @RequestParam(value = "uuid", defaultValue = "", required = false) String uuid,
            @RequestParam(value = "sisterModelOne", defaultValue = "", required = false) String sisterModelOne,
            @RequestParam(value = "sisterModelTwo", defaultValue = "", required = false) String sisterModelTwo,
            @RequestParam(value = "modelType", defaultValue = "", required = false) String modelType,
            @RequestParam(value = "baseCar", defaultValue = "", required = false) String baseCar) {
        
        List<Car> resultList = new ArrayList<>();
        boolean paramIsEmpty = "".equals(text);
        
        if (!paramIsEmpty) {
            for (Car listItem : this.carRepo.findAll()) {
                if (listItem.toString().contains(text.toLowerCase())) {
                    resultList.add(listItem);
                }
            }           
        }
        
        if (!"".equals(id)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllById(Long.parseLong(id)));
        }
        
        if (!"".equals(model)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByModel(model)); 
        }
        
        if (!"".equals(brand)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByBrand(brand));
        }
        
        if (!"".equals(indicator)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByIndicator(indicator));
        }
        
        if (!"".equals(modelFamily)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByModelFamily(modelFamily));
        }
        
        if (!"".equals(launchDate)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByLaunchDate(
                    LocalDate.parse(launchDate)));
        }
        
        if (!"".equals(modelYear)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByModelYear(
                    Integer.parseInt(modelYear)));
        }
        
        if (!"".equals(developmentType)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByDevelopmentType(
                    developmentType));
        }
        
        if (!"".equals(modelStatus)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByModelStatus(modelStatus));
        }
        
        if (!"".equals(segment)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllBySegment(segment));
        }
        
        if (!"".equals(carBodyType)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByCarBodyType(carBodyType));
        }
        
        if (!"".equals(carBodySpecification)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByCarBodySpecification(
                    carBodySpecification));
        }
        
        if (!"".equals(engineType)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByEngineType(engineType));
        }
        
        if (!"".equals(carProject)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByCarProject(carProject));
        }
        
        if (!"".equals(limitation)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByLimitation(limitation));
        }
        
        if (!"".equals(uuid)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByUuid(uuid));
        }
        
        if (!"".equals(sisterModelOne)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllBySisterModelOne(sisterModelOne));
        }
        
        if (!"".equals(sisterModelTwo)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllBySisterModelTwo(sisterModelTwo));
        }
        
        if (!"".equals(modelType)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByModelType(modelType));
        }
        
        if (!"".equals(baseCar)) {
            resultList = this.carService.mergeLists(resultList, this.carRepo.findAllByBaseCar(baseCar));
        }

        return resultList;
    }

}
