package com.Pms.SpringBoot.entity;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Parcel 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int parcelId;
	@JsonIgnore
	@Column (nullable = false)
	private String userId;
	
	private String receiverName;
	
	private String receiverAddress;
	
	private String receiverPin;
	
	private String receiverMobile;
	
	private double parcelWeight;
	
	private String parcelContent;
	
	private String deliveryType;
	
	private String parPackingPreference;
	
	private Date parPickupDate;
	
	private Date parDropoffDate;
	
	private LocalTime parPickupTime;
	
	private LocalTime parDropupTime;
	@Column (nullable = false)
	private double serviceCost;
	@Column (nullable = false)
    private LocalDateTime paymentTime;
	
	private String parcelStatus;

    
	public Parcel() {
		super();
		// TODO Auto-generated constructor stub
	}
    public Parcel(String userId,  String receiverName,  String receiverAddress,
			 String receiverPin,  String receiverMobile,  double parcelWeight,
			 String parcelContent,  String deliveryType,  String parPackingPreference,
			 Date parPickupDate,  Date parDropoffDate,  LocalTime parPickupTime,
			 LocalTime parDropupTime,double serviceCost, LocalDateTime paymentTime,String parcelStatus) 
	{
		this.userId = userId;
		this.receiverName = receiverName;
		this.receiverAddress = receiverAddress;
		this.receiverPin = receiverPin;
		this.receiverMobile = receiverMobile;
		this.parcelWeight = parcelWeight;
		this.parcelContent = parcelContent;
		this.deliveryType = deliveryType;
		this.parPackingPreference = parPackingPreference;
		this.parPickupDate = parPickupDate;
		this.parDropoffDate = parDropoffDate;
		this.parPickupTime = parPickupTime;
		this.parDropupTime = parDropupTime;
		this.serviceCost = serviceCost;
		this.paymentTime = paymentTime;
		this.parcelStatus=parcelStatus;
	}
	
	public String getReceiverName()
	{
		return receiverName;
	}
	public int getParcelId() 
	{
		return parcelId;
	}
	public void setReceiverName(String receiverName) 
	{
		this.receiverName = receiverName;
	}
	public String getReceiverAddress() 
	{
		return receiverAddress;
	}
	public void setReceiverAddress(String receiverAddress) 
	{
		this.receiverAddress = receiverAddress;
	}
	public String getReceiverPin() 
	{
		return receiverPin;
	}
	public void setReceiverPin(String receiverPin) 
	{
		this.receiverPin = receiverPin;
	}
	public String getReceiverMobile() {
		return receiverMobile;
	}
	public void setReceiverMobile(String receiverMobile) 
	{
		this.receiverMobile = receiverMobile;
	}
	public double getParcelWeight() 
	{
		return parcelWeight;
	}
	
	public double getServiceCost() {
		return serviceCost;
	}

	public void setServiceCost(double serviceCost) {
		this.serviceCost = serviceCost;
	}

	public LocalDateTime getPaymentTime() {
		return paymentTime;
	}
	public String getParcelStatus() {
		return parcelStatus;
	}

	public void setParcelStatus(String parcelStatus) {
		this.parcelStatus = parcelStatus;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setPaymentTime(LocalDateTime paymentTime) {
		this.paymentTime = paymentTime;
	}

	public void setParcelWeight(double parcelWeight) 
	{
		this.parcelWeight = parcelWeight;
	}
	public String getParcelContent() 
	{
		return parcelContent;
	}
	public void setParcelContent(String parcelContent) 
	{
		this.parcelContent = parcelContent;
	}
	public String getDeliveryType() 
	{
		return deliveryType;
	}
	public void setDeliveryType(String deliveryType) 
	{
		this.deliveryType = deliveryType;
	}
	public String getParPackingPreference() 
	{
		return parPackingPreference;
	}
	public void setParPackingPreference(String parPackingPreference) 
	{
		this.parPackingPreference = parPackingPreference;
	}
	public Date getParPickupDate() {
		return parPickupDate;
	}
	public void setParPickupDate(Date parPickupDate) 
	{
		this.parPickupDate = parPickupDate;
	}
	public Date getParDropoffDate() 
	{
		return parDropoffDate;
	}
	public void setParDropoffDate(Date parDropoffDate) 
	{
		this.parDropoffDate = parDropoffDate;
	}
	public LocalTime getParPickupTime() 
	{
		return parPickupTime;
	}
	public void setParPickupTime(LocalTime parPickupTime) 
	{
		this.parPickupTime = parPickupTime;
	}
	public LocalTime getParDropupTime() 
	{
		return parDropupTime;
	}
	public void setParDropupTime(LocalTime parDropupTime) 
	{
		this.parDropupTime = parDropupTime;
	}
	
	
}
