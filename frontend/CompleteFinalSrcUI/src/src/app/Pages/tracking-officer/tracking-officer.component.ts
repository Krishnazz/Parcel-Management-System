import { Component } from '@angular/core';
import { ParcelService } from '../services/parcel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracking-officer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tracking-officer.component.html',
  styleUrls: ['./tracking-officer.component.css']
})

export class TrackingOfficerComponent {
  userId!: number;
  trackingList: any[] = [];
  error: string = '';

  constructor(private parcelService: ParcelService) {}

  fetchParcelsByUser(): void {
    if (!this.userId || this.userId <= 0) {
      this.error = 'Please enter a valid User ID.';
      this.trackingList = [];
      return;
    }

    this.parcelService.getParcelByBookingId(this.userId).subscribe({
      next: (data: any[][]) => {
        this.trackingList = data.map(item => ({
          bookingId: item[0],
          receiverName: item[3],
          receiverAddress: item[4],
          status: item[6],
          currentLocation: item[4],
          dateOfBooking: item[5],
          finalStatus: item[6]
        }));
        this.error = '';
      },
      error: () => {
        this.error = 'No parcels found.';
        this.trackingList = [];
      }
    });
  }
}