package de.personal.carinfo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.personal.carinfo.objects.Person;
import de.personal.carinfo.repos.PersonRepository;
import de.personal.carinfo.services.PersonService;

@RestController
public class PersonController {
	@Autowired
    private PersonRepository personRepo;

    @Autowired
    private PersonService personService;
	
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
            @RequestParam(value = "email", defaultValue = "", required = true) String email,
            @RequestParam(value = "password", defaultValue = "", required = true) String password,
            @RequestParam(value = "salutation", defaultValue = "", required = false) String salutation,
            @RequestParam(value = "company", defaultValue = "", required = true) String company) {

        BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(4);
        Person personToEdit;
        Map<String, String> dataMap;
        
        try {
            dataMap = this.personService.createMapping(firstName, secondName, birthDate,
            		address, houseNumber, areaCode, area, email, bcryptEncoder.encode(password),
            		salutation, company);
            personToEdit = this.personService.editOrCreatePerson(dataMap, false);
            return new ResponseEntity<>(this.personRepo.save(personToEdit), HttpStatus.OK);
            
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
