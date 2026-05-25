package com.Pms.SpringBoot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Pms.SpringBoot.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>
{
	
	
	
	
}
