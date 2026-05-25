
import { Component } from '@angular/core';
import { ParcelService } from '../services/parcel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-pickup',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private parcelService: ParcelService) {}

  searchParcel() {
    if (!this.bookingId) {
      this.error = 'Booking ID is required.';
      this.selectedParcel = null;
      return;
    }

    this.parcelService.getParcelByBookingId(this.bookingId).subscribe({
      next: (data) => {
        this.selectedParcel = data;
        this.pickupTime = data.pickupTime || '';
        this.dropOffTime = data.dropOffTime || '';
        this.message = '';
        this.error = '';
      },
      error: (err) => {
        this.selectedParcel = null;
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
      },
      error: () => {
        this.message = 'Update failed.';
      }
    });
  }
}
