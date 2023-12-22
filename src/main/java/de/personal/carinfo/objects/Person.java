package de.personal.carinfo.objects;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Person {
    @Id
    private long id;

    private String salutation;
    private String firstName;
    private String secondName;
    private LocalDate birthDate;
    private String address;
    private String houseNumber;
    private String areaCode;
    private String area;
    private String email;
    private boolean deactivated;
    private LocalDate dateOfEntry;
    private String company;
    private String password;
    private String role;
    
    private Car car;
    
    public Person(long id, String salutation, String firstName, String secondName, LocalDate birthDate,
            String address, String houseNumber, String areaCode, String area, String email, boolean deactivated,
            LocalDate dateOfEntry, String company, String password, String role, Car car) {
        this.id = id;
        this.salutation = salutation;
        this.firstName = firstName;
        this.secondName = secondName;
        this.birthDate = birthDate;
        this.address = address;
        this.houseNumber = houseNumber;
        this.areaCode = areaCode;
        this.area = area;
        this.email = email;
        this.deactivated = deactivated;
        this.dateOfEntry = dateOfEntry;
        this.company = company;
        this.password = password;
        this.role = role;
        this.car = car;
    }

    public Person() {
    }
    
    public long getId() {
        return this.id;
    }

    public String getSalutation() {
        return this.salutation;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getSecondName() {
        return this.secondName;
    }

    public LocalDate getBirthDate() {
        return this.birthDate;
    }

    public String getAddress() {
        return this.address;
    }

    public String getHouseNumber() {
        return this.houseNumber;
    }

    public String getAreaCode() {
        return this.areaCode;
    }

    public String getArea() {
        return this.area;
    }

    public String getEmail() {
        return email;
    }

    public boolean isDeactivated() {
        return this.deactivated;
    }

    public LocalDate getDateOfEntry() {
        return this.dateOfEntry;
    }

    public String getCompany() {
        return this.company;
    }

    public String getPassword() {
        return this.password;
    }
    
    public String getRole() {
        return this.role;
    }

    public Car getCar() {
        return this.car;
    }
}