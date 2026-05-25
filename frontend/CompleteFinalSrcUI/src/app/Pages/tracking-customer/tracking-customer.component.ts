import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParcelService } from '../services/parcel.service';
import { CommonModule } from '@angular/common';
import { UserHeaderComponent } from "../../Components/user-header/user-header.component";

@Component({
  selector: 'app-customer-tracking',
  standalone: true,
  imports: [CommonModule, UserHeaderComponent],
  templateUrl: './tracking-customer.component.html',
  styleUrls: ['./tracking-customer.component.css']
})
export class TrackingCustomerComponent implements OnInit {
  userId!: string;
  trackingList: any[] = [];
  error: string = '';

  constructor(private route: ActivatedRoute, private parcelService: ParcelService) {}

  obj:any = JSON.parse(sessionStorage.getItem('user')!);
  ngOnInit(): void {
    this.userId = this.obj.userId;
    this.fetchParcelsByUser();
  }

  fetchParcelsByUser(): void {
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