package com.Pms.SpringBoot.Service;

import java.sql.Date;
import java.time.LocalTime;
import java.util.List;

import com.Pms.SpringBoot.entity.Parcel;

public interface OfficerServiceDao 
{
	int BookingService(Parcel parcel);
	Parcel getInvoiceByBookingId(int bookingId, String userId);
	List<Object[]> getBookingHistoryOfficer(String userId,Date startDate,Date endDate);
	String updatePickupDropoff(int parcelId, LocalTime pickupTime, LocalTime dropoffTime);
	String updateParcelStatus(int parcelId, String status);
}
