package de.personal.carinfo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import de.personal.carinfo.objects.Person;
import de.personal.carinfo.repos.PersonRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
	@Autowired
	private PersonRepository personRepo;

	@PostMapping("/login")
	public String login(@RequestBody Map<String, String> request) {
		BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(4);
		String userName = request.get("email");
		String password = request.get("password");
		Person user = this.personRepo.findByEmail(userName).orElse(null);

		if (user == null || !bcryptEncoder.matches(password, user.getPassword())) {
			return "UNAUTHORIZED";
		} else if (user.isDeactivated()) {
			return "DEACTIVATED";
		}

		return user.getRole().toString();
	}
}
