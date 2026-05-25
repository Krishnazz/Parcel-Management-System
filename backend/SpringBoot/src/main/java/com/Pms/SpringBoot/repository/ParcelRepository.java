package com.Pms.SpringBoot.repository;

import java.sql.Date;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Pms.SpringBoot.entity.Parcel;

import jakarta.transaction.Transactional;

@Repository
public interface ParcelRepository extends JpaRepository<Parcel, Integer>
{
	@Query(value = "SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM Parcel p WHERE p.parcel_id = :parcelId AND p.user_id = :userId", nativeQuery = true)
	boolean existsByIdAndUserId(int parcelId, String userId);
	
	@Query(value = "Select USER_ID,PARCEL_ID,PAYMENT_TIME,RECEIVER_NAME,RECEIVER_ADDRESS,SERVICE_COST,PARCEL_STATUS FROM Parcel Where USER_ID = :userId ORDER BY PAYMENT_TIME DESC",nativeQuery=true)
	List<Object[]> BookingHistory(String userId);
	
	@Query(value = "Select USER_ID,PARCEL_ID,PAYMENT_TIME,RECEIVER_NAME,RECEIVER_ADDRESS,SERVICE_COST,PARCEL_STATUS FROM Parcel Where USER_ID = :userId AND  PAYMENT_TIME>= :startDate AND PAYMENT_TIME<= :endDate ORDER BY PAYMENT_TIME DESC",nativeQuery=true)
	List<Object[]> BookingHistoryOfficer(String userId,Date startDate,Date endDate);
	
	
	//Booking ID | FullName | Address | Rec_Name | Rec_Address | Date of Booking |Par_Status
	@Query(value = "SELECT  p.parcel_id,u.full_name,u.address,p.receiver_name,p.receiver_address,p.payment_time,p.parcel_status from Parcel p Join Users u on p.user_id = u.user_id where p.parcel_id= :bookingId",nativeQuery=true)
	List<Object[]> getTrackingStatusOfficer(int bookingId);
	
	@Query(value = "SELECT  p.parcel_id,u.full_name,u.address,p.receiver_name,p.receiver_address,p.payment_time,p.parcel_status from Parcel p Join Users u on p.user_id = u.user_id where  u.user_id = :userId",nativeQuery=true)
	List<Object[]> getTrackingStatusUser(String userId);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE Parcel SET PAR_PICKUP_TIME = :pickupTime,PAR_DROPUP_TIME= :dropoffTime WHERE parcel_id= :parcelId",nativeQuery=true)
	int updatePickupAndDropoff( int parcelId, LocalTime pickupTime, LocalTime dropoffTime);
	
	@Modifying
	@Transactional
	@Query(value = "UPDATE Parcel SET parcel_status = :status WHERE parcel_Id= :parcelId",nativeQuery = true)
	int updateParcelStatus(
			@Param("parcelId") int parcelId,
			@Param("status") String status);
}
