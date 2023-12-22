package de.personal.carinfo.objects;

import java.time.LocalDate;
import java.util.List;

public class CarBuilder {
	private int id;
	private String model;
	private String brand;
	private String indicator;
	private String modelFamily;
	private LocalDate launchDate;
	private Integer modelYear;
	private String developmentType;
	private String modelStatus;
	private String segment;
	private String carBodyType;
	private String carBodySpecification;
	private String engineType;
	private String carProject;
	private String limitation;
	private String uuid;
	private String sisterModelOne;
	private String sisterModelTwo;
	private String modelType;
	private String baseCar;
	private List<Person> persons;
	
	public CarBuilder() {
	}
	
	public CarBuilder withId(int id) {
		this.id = id;
		return this;
	}
	
	public CarBuilder withModel(String model) {
		this.model = model;
		return this;
	}
	
	public CarBuilder withBrand(String brand) {
		this.brand = brand;
		return this;
	}
	
	public CarBuilder withIndicator(String indicator) {
		this.indicator = indicator;
		return this;
		
	}
	
	public CarBuilder withModelFamily(String modelFamily) {
		this.modelFamily = modelFamily;
		return this;
	}
	
	public CarBuilder withLaunchDate(LocalDate launchDate) {
		this.launchDate = launchDate;
		return this;
	}
	
	public CarBuilder withModelYear(Integer modelYear) {
		this.modelYear = modelYear;
		return this;
	}
	
	public CarBuilder withDevelopmentType(String developmentType) {
		this.developmentType = developmentType;
		return this;
	}
	
	public CarBuilder withModelStatus(String modelStatus) {
		this.modelStatus = modelStatus;
		return this;
	}
	
	public CarBuilder withSegment(String segment) {
		this.segment = segment;
		return this;
	}
	
	public CarBuilder withCarBodyType(String carBodyType) {
		this.carBodyType = carBodyType;
		return this;
	}
	
	public CarBuilder withCarBodySpecification(String carBodySpecification) {
		this.carBodySpecification = carBodySpecification;
		return this;
	}
	
	public CarBuilder withEngineType(String engineType) {
		this.engineType = engineType;
		return this;
	}
	
	public CarBuilder withCarProject(String carProject) {
		this.carProject = carProject;
		return this;
	}
	
	public CarBuilder withLimitation(String limitation) {
		this.limitation = limitation;
		return this;
	}
	
	public CarBuilder withUUID(String uuid) {
		this.uuid = uuid;
		return this;
	}
	
	public CarBuilder withSisterModelOne(String sisterModelOne) {
		this.sisterModelOne = sisterModelOne;
		return this;
	}
	
	public CarBuilder withSisterModelTwo(String sisterModelTwo) {
		this.sisterModelTwo = sisterModelTwo;
		return this;
	}
	
	public CarBuilder withModelType(String modelType) {
		this.modelType = modelType;
		return this;
	}
	
	public CarBuilder withBaseCar(String baseCar) {
		this.baseCar = baseCar;
		return this;
	}
	
	public CarBuilder withPersons(List<Person> persons) {
		this.persons = persons;
		return this;
	}
	
	public Car build() {
		return new Car(this.id, this.model, this.brand, this.indicator, this.modelFamily, this.launchDate,
				this.modelYear, this.developmentType, this.modelStatus, this.segment, this.carBodyType,
				this.carBodySpecification, this.engineType, this.carProject, this.limitation, this.uuid,
				this.sisterModelOne, this.sisterModelTwo, this.modelType,  this.baseCar, this.persons);
	}
}
