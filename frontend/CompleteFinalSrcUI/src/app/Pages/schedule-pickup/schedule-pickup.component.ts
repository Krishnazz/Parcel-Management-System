
import { Component } from '@angular/core';
import { ParcelService } from '../services/parcel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from "../../Components/admin-header/admin-header.component";

@Component({
  selector: 'app-schedule-pickup',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminHeaderComponent],
  templateUrl: './schedule-pickup.component.html',
  styleUrls: ['./schedule-pickup.component.css']
})
export class SchedulePickupComponent {
  bookingId!: number;
  selectedParcel: any = null;
  pickupTime: string = '';
  dropOffTime: string = '';
  message: string = '';
  error: string = '';
  updated: boolean = false; 
  constructor(private parcelService: ParcelService) {}

  searchParcel() {
    this.error = '';
    this.message = '';
    this.selectedParcel = null;
    this.updated = false; 
    if (!this.bookingId) {
      this.error = 'Booking ID is required.';
      return;
    }

    this.parcelService.getParcelByBookingId(this.bookingId).subscribe({
      next: (data: any[][]) => {
        const item = data[0]; 
        if (item) {
          this.selectedParcel = {
            bookingId: item[0],
            fullName: item[1],
            address: item[2],
            receiverName: item[3],
            receiverAddress: item[4],
            dateOfBooking: item[5],
            status: item[6],
            pickupTime: item[7],     
            dropOffTime: item[8]      
          };
        } else {
          this.error = 'No parcel data found.';
        }
      },
      error: () => {
        this.error = 'Parcel not found.';
      }
    });
  }

  updateTimes() {
    if (!this.pickupTime || !this.dropOffTime) {
      this.message = 'Please enter both pickup and drop-off times.';
      return;
    }

    this.parcelService.updatePickupAndDropTime(this.bookingId, {
      pickupTime: this.pickupTime,
      dropOffTime: this.dropOffTime
    }).subscribe({
      next: (msg) => {
        this.message = msg;
        this.error = '';
        this.updated = true; 

        
        if (this.selectedParcel) {
          this.selectedParcel.pickupTime = this.pickupTime;
          this.selectedParcel.dropOffTime = this.dropOffTime;
        }

        
        this.pickupTime = '';
        this.dropOffTime = '';
      },
      error: () => {
        this.message = 'Update failed.';
      }
    });
  }
}