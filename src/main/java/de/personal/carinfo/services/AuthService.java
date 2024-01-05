package de.personal.carinfo.services;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
			this.logger.info("Password correct.");
			return true;
		} else if (user != null && password.equals(user.getPassword())) {
			this.logger.info("Password correct.");
			return true;
		} else {
			this.logger.info("Password not correct.");
			return false;
		}
	}
	
	/**
	 * Checks password to ensure that it contains one small letter, one capital letter, and one digit. 
	 * Morever, it ensures that no dollar sign, semicolon or commas are included. Finally, the minimum length
	 * is set to 4 and the maximum length to 8 characters.
	 * 
	 * @param password	the password to check.
	 * 
	 * @return true, if valid password.
	 */
    public boolean isValidPassword(String password) {
        String regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^\\s$;,]{4,8}$";
        Pattern p = Pattern.compile(regex);
 
        if (password != null) {
            Matcher m = p.matcher(password);
            return m.matches();
        }
        
        return false;
    }
}
