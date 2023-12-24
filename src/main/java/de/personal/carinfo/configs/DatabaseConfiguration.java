package de.personal.carinfo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import de.personal.carinfo.repos.CarRepository;
import de.personal.carinfo.repos.PersonRepository;
import de.personal.carinfo.services.CarService;
import de.personal.carinfo.services.PersonService;
import jakarta.annotation.PostConstruct;

@Configuration
public class DatabaseConfiguration {
	
	@Autowired
	private CarRepository carRepo;
	
	@Autowired
	private CarService carService;
	
	@Autowired
	private PersonRepository personRepo;
	
	@Autowired
	private PersonService personService;
	
	@PostConstruct
	public void setupDatabase() {
		if (this.carRepo.findAll().isEmpty()) {
			this.carService.readCarDataFromCSV(true);
		}
		
		if (this.personRepo.findAll().isEmpty()) {
			this.personService.readPersonDataFromCSV(true);
		}
	}
}