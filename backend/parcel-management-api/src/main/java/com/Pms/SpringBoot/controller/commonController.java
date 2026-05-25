package com.Pms.SpringBoot.controller;



import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Pms.SpringBoot.Service.CommonServiceImpl;
import com.Pms.SpringBoot.entity.User;
import com.Pms.SpringBoot.exception.ResourceNotFoundException;
import com.Pms.SpringBoot.security.JwtUtil;


/**
 * 
 * The commonController class handles commonController tasks.
 *
 */
@RestController
public class commonController {
	
	@Autowired
	CommonServiceImpl commonService;
	
	 
	@Autowired
	JwtUtil jwtUtil;

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestParam("userId") String userId, @RequestParam("password") String password) {
		try {
			User user = commonService.loginUser(userId, password);
			if (user != null) {
				String token = jwtUtil.generateToken(user);
				Map<String, Object> response = new HashMap<>();
				response.put("token", token);
				response.put("user", user);
				return new ResponseEntity<>(response, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
			}
		} catch (ResourceNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
