package de.personal.carinfo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.personal.carinfo.objects.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

}
