package de.personal.carinfo.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import de.personal.carinfo.objects.Person;
import de.personal.carinfo.objects.Role;
import de.personal.carinfo.repos.PersonRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private PersonRepository personRepo;
	
	@Override
    public UserDetails loadUserByUsername(String email) {
    	Person person = this.personRepo.findByEmail(email).orElse(null);
        if (person == null) {
            throw new UsernameNotFoundException(email);
        }
        
        UserDetails userDetails = User
				.withUsername(person.getEmail())
				.password(person.getPassword())
				.roles(Role.USER.toString()).build();
        
        return userDetails; 
    }
}