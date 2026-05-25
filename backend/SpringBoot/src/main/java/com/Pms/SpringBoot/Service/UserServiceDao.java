package com.Pms.SpringBoot.Service;


import java.util.List;

import com.Pms.SpringBoot.entity.Parcel;
import com.Pms.SpringBoot.entity.User;

public interface UserServiceDao {
	
	User registerUser(User userobj);
	int BookingService(Parcel parcel);
	Parcel getInvoiceByBookingId(int bookingId, String userId);
	List<Object[]> getBookingHistory(String userId);
	boolean getValidUser(String userId);
}
