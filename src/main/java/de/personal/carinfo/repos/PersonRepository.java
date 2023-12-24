package de.personal.carinfo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.personal.carinfo.objects.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

}
