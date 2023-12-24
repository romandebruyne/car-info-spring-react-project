package de.personal.carinfo.repos;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.personal.carinfo.objects.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
	List<Car> findAllByBaseCar(String baseCar);
	List<Car> findAllByBrand(String brand);
	List<Car> findAllByCarBodySpecification(String carBodySpecification);
	List<Car> findAllByCarBodyType(String carBodyType);
	List<Car> findAllByCarProject(String carProject);
	List<Car> findAllByDevelopmentType(String developmentType);
	List<Car> findAllByEngineType(String engineType);
	List<Car> findAllByIndicator(String indicator);
	List<Car> findAllByLaunchDate(LocalDate launchDate);
	List<Car> findAllByLimitation(String limitation);
	List<Car> findAllByModel(String model);
	List<Car> findAllByModelFamily(String modelFamily);
	List<Car> findAllByModelStatus(String modelStatus);
	List<Car> findAllByModelType(String modelType);
	List<Car> findAllByModelYear(Integer modelYear);
	List<Car> findAllBySegment(String segment);
	List<Car> findAllBySisterModelOne(String sisterModelOne);
	List<Car> findAllBySisterModelTwo(String sisterModelTwo);
	List<Car> findAllByUuid(String uuid);
	List<Car> findAllById(Long id);
}
