package com.Pms.SpringBoot.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Pms.SpringBoot.entity.User;
import com.Pms.SpringBoot.repository.ParcelRepository;
import com.Pms.SpringBoot.repository.UserRepository;


/**
 * 
 * The commonController service handles commonController tasks.
 *
 */
@Service
public class CommonServiceImpl implements CommonServiceDao{
	
	@Autowired
	UserRepository UserRepo;
	
	@Autowired
	ParcelRepository parcelRepo;
	 //common login and officers
	public User loginUser(String userId, String password) 
	{
		// TODO Auto-generated method stub
		User user=UserRepo.findById(userId).orElse(null);
		if(user.getPassword().equals(password)&&!user.getRole().equals("ADMIN")) 
		{
			return user;
		}
		else if(user.getPassword().equals(password)&&user.getRole().equals("ADMIN")) 
		{
			return user;
		}
		else 
		{
			return null;
		}
		 
	}
	
}
