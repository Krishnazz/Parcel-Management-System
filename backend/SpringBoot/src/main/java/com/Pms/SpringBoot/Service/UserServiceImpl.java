package com.Pms.SpringBoot.Service;



import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pms.SpringBoot.entity.Parcel;
import com.Pms.SpringBoot.entity.User;
import com.Pms.SpringBoot.exception.ResourceNotFoundException;
import com.Pms.SpringBoot.repository.ParcelRepository;
import com.Pms.SpringBoot.repository.UserRepository;


@Service
public class UserServiceImpl implements UserServiceDao
{
		@Autowired
		UserRepository UserRepo;
		
		@Autowired
		ParcelRepository parcelRepo;

		public User registerUser(User userobj) 
		{
			// TODO Auto-generated method stub
			
			String validUserid= userobj.getUserId();
			Optional<User> valid = UserRepo.findById(validUserid);
			if(!valid.isPresent()) {
				User response =  UserRepo.save(userobj);
				if(response!=null) {
					return response;
				}
			}
			return null;
		}

		
		
		
		public int BookingService(Parcel parcel) {
			// TODO Auto-generated method stub
			Parcel response= parcelRepo.save(parcel);
			if(response!=null) {
				return response.getParcelId();
			}
			return 0;
		}
		
		public Parcel getInvoiceByBookingId(int bookingId, String userId) {
		    // Check if the booking ID is associated with the given user ID
		    boolean isUserAuthorized = parcelRepo.existsByIdAndUserId(bookingId, userId);
		    if (!isUserAuthorized) {
		        // Throw an exception if the user is not authorized to access this booking
		        throw new ResourceNotFoundException("Unauthorized access or booking not found for user ID: " + userId);
		    }
		    // Retrieve the parcel if the user is authorized
		    return parcelRepo.findById(bookingId)
		            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
		}
		
		 //common bookingHistory for users and officers
		public List<Object[]> getBookingHistory(String userId) {
			// TODO Auto-generated method stub
			
			List<Object[]> BookingHistory = parcelRepo.BookingHistory(userId);
			return BookingHistory;
		}
		
		public boolean getValidUser(String userId) {
			boolean isValidUser = UserRepo.existsById(userId);
			return isValidUser;
		}
		
		public List<Object[]> getTrackingStatus(String userId){
			List<Object[]> trackingStatus = parcelRepo.getTrackingStatusUser(userId);
			return trackingStatus;
			
		}


}
