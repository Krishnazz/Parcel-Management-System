import { Component } from '@angular/core';
import { ParcelService } from '../services/parcel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminHeaderComponent } from "../../Components/admin-header/admin-header.component";

@Component({
  selector: 'app-tracking-officer',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminHeaderComponent],
  templateUrl: './tracking-officer.component.html',
  styleUrls: ['./tracking-officer.component.css']
})

export class TrackingOfficerComponent {


  userId!: string;
  trackingList: any[] = [];
  error: string = '';

  constructor(private parcelService: ParcelService) {}

  fetchParcelsByUser(): void {

    const trimmed = this.userId.trim()
    if(!trimmed){
      this.error = 'please enter something'
      return;
    }
    if(!isNaN(Number(trimmed))){
      const id = Number(trimmed)
      this.parcelService.getParcelByBookingId(id).subscribe({
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
    }else {
      this.parcelService.getParcelsByUserId(this.userId).subscribe({
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
}