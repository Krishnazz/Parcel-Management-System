import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParcelService } from '../services/parcel.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tracking-customer.component.html',
  styleUrls: ['./tracking-customer.component.css']
})
export class TrackingCustomerComponent implements OnInit {
  userId!: number;
  trackingList: any[] = [];
  error: string = '';

  constructor(private route: ActivatedRoute, private parcelService: ParcelService) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.fetchParcelsByUser();
  }

  fetchParcelsByUser(): void {
    this.parcelService.getParcelsByUserId(this.userId).subscribe({
      next: (data) => {
        this.trackingList = data;
        this.error = '';
      },
      error: () => {
        this.error = 'No parcels found.';
        this.trackingList = [];
      }
    });
  }
}