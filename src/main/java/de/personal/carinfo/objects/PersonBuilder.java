package de.personal.carinfo.objects;

import java.time.LocalDate;

public class PersonBuilder {
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
    private Role role;
    private Car car;
    
    public PersonBuilder() {
    }
    
    public PersonBuilder withId(long id) {
    	this.id = id;
    	return this;
    }
    
    public PersonBuilder withSalutation(String salutation) {
    	this.salutation = salutation;
    	return this;
    }
    
    public PersonBuilder withFirstName(String firstName) {
    	this.firstName = firstName;
    	return this;
    }
    
    public PersonBuilder withSecondName(String secondName) {
    	this.secondName = secondName;
    	return this;
    }
    
    public PersonBuilder withBirthDate(LocalDate birthDate) {
    	this.birthDate = birthDate;
    	return this;
    }
    
    public PersonBuilder withAddress(String address) {
    	this.address = address;
    	return this;
    }
    
    public PersonBuilder withHouseNumber(String houseNumber) {
    	this.houseNumber = houseNumber;
    	return this;
    }
    
    public PersonBuilder withAreaCode(String areaCode) {
    	this.areaCode = areaCode;
    	return this;
    }
    
    public PersonBuilder withArea(String area) {
    	this.area = area;
    	return this;
    }
    
    public PersonBuilder withEmail(String email) {
    	this.email = email;
    	return this;
    }
    
    public PersonBuilder withDeactivated(boolean deactivated) {
    	this.deactivated = deactivated;
    	return this;
    }
    public PersonBuilder withDateOfEntry(LocalDate dateOfEntry) {
    	this.dateOfEntry = dateOfEntry;
    	return this;
    }
    
    public PersonBuilder withCompany(String company) {
    	this.company = company;
    	return this;
    }
    
    public PersonBuilder withPassword(String password) {
    	this.password = password;
    	return this;
    }
    
    public PersonBuilder withRole(Role role) {
    	this.role = role;
    	return this;
    }
    
    public PersonBuilder withCar(Car car) {
    	this.car = car;
    	return this;
    }
    
    public Person build() {
    	return new Person(this.id, this.salutation, this.firstName, this.secondName, this.birthDate,
                this.address, this.houseNumber, this.areaCode, this.area, this.email, this.deactivated,
                this.dateOfEntry, this.company, this.password, this.role, this.car);
    }
}
