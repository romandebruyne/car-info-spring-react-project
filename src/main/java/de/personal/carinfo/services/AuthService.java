package de.personal.carinfo.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import de.personal.carinfo.objects.Person;
import de.personal.carinfo.repos.PersonRepository;

@Service
public class AuthService {
	private Logger logger = LoggerFactory.getLogger(AuthService.class);
	private BCryptPasswordEncoder bCryptEncoder = new BCryptPasswordEncoder(4);
	
	@Autowired
	private PersonRepository personRepo;
	
	public boolean passwordIsCorrect(String eMail, String password) {
		Person user = this.personRepo.findByEmail(eMail).orElse(null);
		
		if (user != null && password.charAt(0) != '$'
				&& this.bCryptEncoder.matches(password, user.getPassword())) {
			this.logger.info("Password is correct.");
			return true;
		} else if (user != null && password.equals(user.getPassword())) {
			this.logger.info("Password is correct.");
			return true;
		} else {
			this.logger.info("Password is not correct.");
			return false;
		}
	}
}
