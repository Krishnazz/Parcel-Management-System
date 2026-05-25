package com.Pms.SpringBoot.entity;




import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
@Entity
@Table(name="users")
public class User {
    @Id
    private String userId;
    
    @NotNull
    private String fullName;
    
    @NotNull
    private String email;
    
    @NotNull
    private String mobileNumber;
    
    @NotNull
    private String address;
    
    @NotNull
    private String password;
    
    private String role;
    
	public User() 
	{
		super();
		// TODO Auto-generated constructor stub
	}
	
	public User(String userId,String fullName, String email, String mobileNumber, String address,
			String password, String role) 
	{
		super();
	
		this.userId=userId;
		this.fullName = fullName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.address = address;
		this.password = password;
		this.role = role;
	}
	



	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getFullName() 
	{
		return fullName;
	}
	
	
	public void setFullName(String fullName) 
	{
		this.fullName = fullName;
	}
	
	
	public String getEmail() 
	{
		return email;
	}
	
	
	public void setEmail(String email) 
	{
		this.email = email;
	}
	
	
	public String getMobileNumber() 
	{
		return mobileNumber;
	}
	
	
	public void setMobileNumber(String mobileNumber) 
	{
		this.mobileNumber = mobileNumber;
	}
	
	
	public String getAddress() {
		return address;
	}
	
	
	public void setAddress(String address) 
	{
		this.address = address;
	}
	
	
	public String getPassword() {
		
		return password;
	}
	
	
	public void setPassword(String password) 
	{
		this.password = password;
	}
	
	
	public String getRole() 
	{
		return role;
	}
	
	
	public void setRole(String role) 
	{
		this.role = role;
	}
    
    
	
}
