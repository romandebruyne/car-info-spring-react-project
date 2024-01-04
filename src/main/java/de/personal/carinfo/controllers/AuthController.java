package de.personal.carinfo.controllers;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import de.personal.carinfo.repos.PersonRepository;
import de.personal.carinfo.services.AuthService;
import de.personal.carinfo.services.PersonService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
	private Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private PersonService personService;
	
	@Autowired
	private PersonRepository personRepo;

	@PostMapping("/login")
	public String login(@RequestBody Map<String, String> request) {
		String eMail = request.get("email"), password = request.get("password");
		
		if (!this.personService.personExistsInDatabase(eMail)
				|| !this.authService.passwordIsCorrect(eMail, password)) {
			this.logger.warn("Unauthorized login.");
			return "UNAUTHORIZED";
		} else if (this.personService.personIsDeactivated(eMail)) {
			this.logger.warn("User is deactivated.");
			return "DEACTIVATED";
		}

		this.logger.info("Successful login.");
		return this.personRepo.findByEmail(eMail).get().getRole().toString();
	}
}
