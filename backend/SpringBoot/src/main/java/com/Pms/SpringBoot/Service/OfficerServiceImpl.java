package com.Pms.SpringBoot.Service;
import java.sql.Date;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pms.SpringBoot.entity.Parcel;
import com.Pms.SpringBoot.exception.ResourceNotFoundException;
import com.Pms.SpringBoot.repository.ParcelRepository;
import com.Pms.SpringBoot.repository.UserRepository;


@Service
public class OfficerServiceImpl implements OfficerServiceDao
{

		@Autowired
		UserRepository UserRepo;
		
		@Autowired
		ParcelRepository ParcelRepo;


		
		public int BookingService(Parcel parcel) {
			// TODO Auto-generated method stub
			Parcel response= ParcelRepo.save(parcel);
			if(response!=null) {
				return response.getParcelId();
			}
			return 0;
		}
		
		public Parcel getInvoiceByBookingId(int bookingId, String userId) {
		    // Check if the booking ID is associated with the given user ID
		    boolean isUserAuthorized = ParcelRepo.existsByIdAndUserId(bookingId, userId);
		    if (!isUserAuthorized) {
		        // Throw an exception if the user is not authorized to access this booking
		        throw new ResourceNotFoundException("Unauthorized access or booking not found for user ID: " + userId);
		    }
		    // Retrieve the parcel if the user is authorized
		    return ParcelRepo.findById(bookingId)
		            .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
		}
		
		 //common bookingHistory for users and officers
		public List<Object[]> getBookingHistoryOfficer(String userId,Date startDate,Date endDate) {
			// TODO Auto-generated method stub
			
			List<Object[]> BookingHistory = ParcelRepo.BookingHistoryOfficer(userId,startDate,endDate);
			return BookingHistory;
		}
		
		public String updatePickupDropoff(int parcelId, LocalTime pickupTime, LocalTime dropoffTime)
		  {
			  int rows=ParcelRepo.updatePickupAndDropoff(parcelId, pickupTime, dropoffTime);
			  return rows > 0? "Pickup and Dropoff time updated successfully." : "Update failed ";
		  }

		
		public String updateParcelStatus(int parcelId, String status) {
			List<String> validStatuses= List.of("Booked","In Transit","Delivered","Returned");
			if(!validStatuses.contains(status))
			{
				return "Invalid status. Allowed values: " + validStatuses;
			}
			int rows = ParcelRepo.updateParcelStatus(parcelId, status);
			
			return rows > 0?"Status updated successfully. " : "Update failed";
		}
		
		public List<Object[]> getTrackingStatus(int bookingId){
			List<Object[]> trackingStatus = ParcelRepo.getTrackingStatusOfficer(bookingId);
			return trackingStatus;
			
		}
		

}
