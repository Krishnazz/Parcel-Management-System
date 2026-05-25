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
    if (!this.userId || isNaN(this.userId) || this.userId <= 0) {
      this.error = 'Please enter a valid User ID.';
      this.trackingList = [];
      return;
    }

    this.parcelService.getParcelsByUserId(this.userId).subscribe({
      next: (data) => {
        console.log('Received:', data);
        if (data && data.length > 0) {
          this.trackingList = data;
          this.error = '';
        } else {
          this.trackingList = [];
          this.error = 'No parcels found for this User ID.';
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.trackingList = [];
        this.error = 'API error or User ID not found.';
      }
    });
  }
}