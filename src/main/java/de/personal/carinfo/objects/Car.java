package de.personal.carinfo.objects;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Car {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
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
	
	@Column(length = 500)
	private String sisterModelOne;
	
	@Column(length = 500)
	private String sisterModelTwo;

	@Column(length = 500)
	private String modelType;
	private String baseCar;
	
	@OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Person> persons;
	
	public Car(int id, String model, String brand, String indicator, String modelFamily, LocalDate launchDate,
			Integer modelYear, String developmentType, String modelStatus, String segment, String carBodyType,
			String carBodySpecification, String engineType, String carProject, String limitation, String uuid,
			String sisterModelOne, String sisterModelTwo, String modelType, String baseCar, List<Person> persons) {
		this.id = id;
		this.model = model;
		this.brand = brand;
		this.indicator = indicator;
		this.modelFamily = modelFamily;
		this.launchDate = launchDate;
		this.modelYear = modelYear;
		this.developmentType = developmentType;
		this.modelStatus = modelStatus;
		this.segment = segment;
		this.carBodyType = carBodyType;
		this.carBodySpecification = carBodySpecification;
		this.engineType = engineType;
		this.carProject = carProject;
		this.limitation = limitation;
		this.uuid = uuid;
		this.sisterModelOne = sisterModelOne;
		this.sisterModelTwo = sisterModelTwo;
		this.modelType = modelType;
		this.baseCar = baseCar;
		this.persons = persons;
	}

	public Car() {
	}

	public long getId() {
		return this.id;
	}

	public String getModel() {
		return this.model;
	}

	public String getBrand() {
		return this.brand;
	}

	public String getIndicator() {
		return this.indicator;
	}

	public String getModelFamily() {
		return this.modelFamily;
	}

	public LocalDate getLaunchDate() {
		return this.launchDate;
	}

	public Integer getModelYear() {
		return this.modelYear;
	}

	public String getDevelopmentType() {
		return this.developmentType;
	}

	public String getModelStatus() {
		return this.modelStatus;
	}

	public String getSegment() {
		return this.segment;
	}

	public String getCarBodyType() {
		return this.carBodyType;
	}

	public String getCarBodySpecification() {
		return this.carBodySpecification;
	}

	public String getEngineType() {
		return this.engineType;
	}

	public String getCarProject() {
		return this.carProject;
	}

	public String getLimitation() {
		return this.limitation;
	}

	public String getUuid() {
		return this.uuid;
	}

	public String getSisterModelOne() {
		return this.sisterModelOne;
	}

	public String getSisterModelTwo() {
		return this.sisterModelTwo;
	}

	public String getModelType() {
		return this.modelType;
	}

	public String getBaseCar() {
		return this.baseCar;
	}

	public List<Person> getPersons() {
		return this.persons;
	}
	
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append(this.id);
		sb.append(this.model.toLowerCase());
		sb.append(this.brand.toLowerCase());
		sb.append(this.indicator.toLowerCase());
		sb.append(this.modelFamily.toLowerCase());
		sb.append(this.launchDate);
		sb.append(this.modelYear);
		sb.append(this.developmentType.toLowerCase());
		sb.append(this.modelStatus.toLowerCase());
		sb.append(this.segment.toLowerCase());
		sb.append(this.carBodyType.toLowerCase());
		sb.append(this.carBodySpecification.toLowerCase());
		sb.append(this.engineType.toLowerCase());
		sb.append(this.carProject.toLowerCase());
		sb.append(this.limitation.toLowerCase());
		sb.append(this.uuid.toLowerCase());
		sb.append(this.sisterModelOne.toLowerCase());
		sb.append(this.sisterModelTwo.toLowerCase());
		sb.append(this.modelType.toLowerCase());
		sb.append(this.baseCar.toLowerCase());
		return sb.toString();
	}
}
