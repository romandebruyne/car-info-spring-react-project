package de.personal.carinfo.controllers;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.personal.carinfo.objects.Person;
import de.personal.carinfo.repos.PersonRepository;
import de.personal.carinfo.services.AuthService;
import de.personal.carinfo.services.PersonService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PersonController {
	private Logger logger = LoggerFactory.getLogger(PersonController.class);
	private BCryptPasswordEncoder bCryptEncoder = new BCryptPasswordEncoder(4);
	
	@Autowired
    private PersonRepository personRepo;

    @Autowired
    private PersonService personService;
    
    @Autowired
    private AuthService authService;
    
    @GetMapping("/persons")
    public List<Person> getAllPersons() {
        return this.personRepo.findAll();
    }
    
    @GetMapping("/persons/email/{email}")
    public Person getPersonByEMail(@PathVariable String email) {
        return this.personRepo.findByEmail(email).orElse(null);
    }
    
    @PostMapping("/persons")
    public ResponseEntity<Person> createPerson(
            @RequestParam(value = "firstName", defaultValue = "", required = true) String firstName,
			@RequestParam(value = "secondName", defaultValue = "", required = true) String secondName,
			@RequestParam(value = "birthDate", defaultValue = "", required = true) String birthDate,
			@RequestParam(value = "address", defaultValue = "", required = true) String address,
			@RequestParam(value = "houseNumber", defaultValue = "", required = true) String houseNumber,
			@RequestParam(value = "areaCode", defaultValue = "", required = true) String areaCode,
			@RequestParam(value = "area", defaultValue = "", required = true) String area,
			@RequestParam(value = "email", defaultValue = "", required = true) String email,
			@RequestParam(value = "password", defaultValue = "", required = true) String password,
			@RequestParam(value = "salutation", defaultValue = "", required = false) String salutation,
			@RequestParam(value = "company", defaultValue = "", required = false) String company) {

		Map<String, String> dataMap;
		Person personToCreate;

		try {
			dataMap = this.personService.createDataMappingForPersonCreation(firstName, secondName, birthDate,
					address,  houseNumber, areaCode, area, email, this.bCryptEncoder.encode(password),
					salutation, company);
			personToCreate = this.personService.createOrEditPerson(dataMap, true);
			return new ResponseEntity<>(this.personRepo.save(personToCreate), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/persons")
    public ResponseEntity<Person> editPerson(
    		@RequestParam(value = "id", defaultValue = "", required = false) String id,
            @RequestParam(value = "firstName", defaultValue = "", required = true) String firstName,
            @RequestParam(value = "secondName", defaultValue = "", required = true) String secondName,
            @RequestParam(value = "birthDate", defaultValue = "", required = true) String birthDate,
            @RequestParam(value = "address", defaultValue = "", required = true) String address,
            @RequestParam(value = "houseNumber", defaultValue = "", required = true) String houseNumber,
            @RequestParam(value = "areaCode", defaultValue = "", required = true) String areaCode,
            @RequestParam(value = "area", defaultValue = "", required = true) String area,
            @RequestParam(value = "oldEmail", defaultValue = "", required = true) String oldEmail,
            @RequestParam(value = "newEmail", defaultValue = "", required = true) String newEmail,
            @RequestParam(value = "salutation", defaultValue = "", required = false) String salutation,
            @RequestParam(value = "company", defaultValue = "", required = false) String company) {

		Map<String, String> dataMap;
        Person personToEdit;
        
        try {
            dataMap = this.personService.createDataMappingForPersonDataEdit(firstName, secondName, birthDate,
            		address, houseNumber, areaCode, area, oldEmail, newEmail, salutation, company);
            personToEdit = this.personService.createOrEditPerson(dataMap, false);
            return new ResponseEntity<>(this.personRepo.save(personToEdit), HttpStatus.OK);
            
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PutMapping("/persons/changePassword")
    public ResponseEntity<Person> changePassword(
    		@RequestParam(value = "email", defaultValue = "", required = true) String email,
    		@RequestParam(value = "oldPassword", defaultValue = "", required = true) String oldPassword,
            @RequestParam(value = "newPassword", defaultValue = "", required = true) String newPassword,
            @RequestParam(value = "newPasswordValidation", defaultValue = "", required = true)
    			String newPasswordValidation) {

		Person personToEdit;
        
        if (!this.authService.passwordIsCorrect(email, oldPassword)) {
        	this.logger.warn("Old password not correct.");
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if (!newPassword.equals(newPasswordValidation)) {
        	this.logger.warn("New password validation not successful.");
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
        	personToEdit = this.personService.changePersonsPassword(email, this.bCryptEncoder.encode(newPassword));
        	return new ResponseEntity<>(this.personRepo.save(personToEdit), HttpStatus.OK);
        }
    }
	
    @DeleteMapping("/persons")
    public ResponseEntity<HttpStatus> deleteByEmail(
    		@RequestParam(value = "adminEmail", defaultValue = "", required = true) String adminEmail,
    		@RequestParam(value = "userToDeleteEmail", defaultValue = "", required = true)
    			String userToDeleteEmail) {
        
    	if (!adminEmail.equals(userToDeleteEmail)) {
	    	if (this.personService.personExistsInDatabase(userToDeleteEmail)) {
	            this.personRepo.delete(this.personRepo.findByEmail(userToDeleteEmail).get());
	            return new ResponseEntity<>(HttpStatus.OK);
	        }
    	}
        
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
