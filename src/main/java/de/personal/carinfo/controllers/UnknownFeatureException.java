package de.personal.carinfo.controllers;

public class UnknownFeatureException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public UnknownFeatureException(String message) {
		super(message);
	}
}
