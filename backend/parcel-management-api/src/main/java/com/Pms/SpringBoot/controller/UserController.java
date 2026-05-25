package com.Pms.SpringBoot.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Pms.SpringBoot.Service.UserServiceImpl;
import com.Pms.SpringBoot.entity.Parcel;
import com.Pms.SpringBoot.entity.User;
import com.Pms.SpringBoot.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserServiceImpl service;
	
	
	@PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User userobj) {
		try {
			User response = service.registerUser(userobj);
			return response!=null ? 
		            new ResponseEntity<>(response,HttpStatus.CREATED) : 
		            new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (ResourceNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
    
    @PostMapping("/booking")
    public ResponseEntity<?> BookingService(@RequestParam("userId") String userId,@RequestBody Parcel parcel) {
        try {
        	parcel.setUserId(userId); // Set the userId in the Parcel object;
            int response = service.BookingService(parcel);
            return response>0 ? 
                    new ResponseEntity<>(response,HttpStatus.CREATED) : 
                    new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/invoice")
    public ResponseEntity<Parcel> getInvoice(@RequestParam("bookingId") int bookingId,@RequestParam("userId") String userId) {
        try {
            Parcel parcel = service.getInvoiceByBookingId(bookingId,userId);
            return new ResponseEntity<>(parcel, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/bookingHistory/{userId}")
    public ResponseEntity<List<Object[]>> getBookingHistory(@PathVariable("userId") String userId){
    	try {
    		List<Object[]> parcel = service.getBookingHistory(userId);
    		return new ResponseEntity<>(parcel,HttpStatus.OK);
    	}catch (ResourceNotFoundException e) {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    }
    
    
    @GetMapping("/checkingId")
    public boolean validUser(@RequestParam("userId") String userId){
    	return service.getValidUser(userId);
    }
    
    @PostMapping("/TrackingStatus")
    public ResponseEntity<List<Object[]>> TrackingStatus(@RequestParam("userId") String userId){
    	List<Object[]> response =  service.getTrackingStatus(userId);
    	
    	if(response.size()>0) {
    		return new ResponseEntity<>(response,HttpStatus.OK);
    	}
    	else {
    		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    	}
    }
   
}

