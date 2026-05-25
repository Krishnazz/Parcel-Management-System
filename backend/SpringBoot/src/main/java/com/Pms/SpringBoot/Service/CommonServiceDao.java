package com.Pms.SpringBoot.Service;


import com.Pms.SpringBoot.entity.User;


/**
 * 
 * The commonController service Dao handles Interface for commonController service.
 *
 */
public interface CommonServiceDao {
	
	 //common login and officers
	User loginUser(String userId, String password);
	
	

}
