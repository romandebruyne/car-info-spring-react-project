package de.personal.carinfo.controllers;

import java.util.Map;

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
	@Autowired
	private AuthService authService;
	
	@Autowired
	private PersonService personService;
	
	@Autowired
	private PersonRepository personRepo;

	@PostMapping("/login")
	public String login(@RequestBody Map<String, String> request) {
		String eMail = request.get("email"), password = request.get("password");
		
		if (this.personService.personExistsInDatabase(eMail)
				|| !this.authService.passwordIsCorrect(eMail, password)) {
			return "UNAUTHORIZED";
		} else if (this.personService.personIsDeactivated(eMail)) {
			return "DEACTIVATED";
		}

		return this.personRepo.findByEmail(eMail).get().getRole().toString();
	}
}
