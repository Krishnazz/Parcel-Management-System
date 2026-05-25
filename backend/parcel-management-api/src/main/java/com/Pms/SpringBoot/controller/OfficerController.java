package com.Pms.SpringBoot.controller;

import java.sql.Date;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.Pms.SpringBoot.Service.OfficerServiceImpl;
import com.Pms.SpringBoot.entity.Parcel;
import com.Pms.SpringBoot.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/officer")
public class OfficerController {
	

	@Autowired
	OfficerServiceImpl service;
	  
    
    @PostMapping("/booking")
    public ResponseEntity<?> BookingService(@RequestParam("userId") String userId, @RequestBody Parcel parcel) {
        try {
            parcel.setUserId(userId); // Set the userId in the Parcel object
            int response = service.BookingService(parcel);
            return response>0 ? 
                    new ResponseEntity<>(response,HttpStatus.CREATED) : 
                    new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/invoice")
    public ResponseEntity<Parcel> getInvoice(@RequestParam("userId") String userId,@RequestParam("bookingId") int bookingId) {
        try {
            Parcel parcel = service.getInvoiceByBookingId(bookingId, userId);
            return new ResponseEntity<>(parcel, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/bookingHistory/{userId}")
    public ResponseEntity<List<Object[]>> getBookingHistoryOfficer(@PathVariable("userId") String userId,@RequestParam("StartDate")  Date startDate,@RequestParam Date endDate){
    	try {
    		List<Object[]> parcel = service.getBookingHistoryOfficer(userId,startDate,endDate);
    		return new ResponseEntity<>(parcel,HttpStatus.OK);
    	}catch (ResourceNotFoundException e) {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    }
    

    @PutMapping("/update-time")
    public String updateTimes(
    		@RequestParam int parcelId,
    		@RequestParam String pickupTime,
    		@RequestParam String dropoffTime )
    {
    	LocalTime pickup = LocalTime.parse(pickupTime);
    	LocalTime droptime = LocalTime.parse(dropoffTime);
    	return service.updatePickupDropoff(parcelId, pickup, droptime);
    }

    
    @PutMapping("/update_status")
    public String UpdateStatus(
    		@RequestParam int parcelId,
    		@RequestParam String status)
    {
    	return service.updateParcelStatus(parcelId, status);
    }
    
    @GetMapping("/TrackingStatus/{bookingId}")
    public ResponseEntity<List<Object[]>> TrackingStatus(@PathVariable("bookingId") int bookingId){
    	List<Object[]> response =  service.getTrackingStatus(bookingId);
    	
    	if(response.size()>0) {
    		return new ResponseEntity<>(response,HttpStatus.OK);
    	}
    	else {
    		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    	}
    }
    
  
}
