import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../../Components/admin-header/admin-header.component';
import { OfficerBookingHistoryService } from '../../services/officer-booking-history.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-officer-booking-history',
  standalone: true,
  imports: [AdminHeaderComponent,CommonModule,FormsModule],
  templateUrl: './officer-booking-history.component.html',
  styleUrl: './officer-booking-history.component.css'
})
export class OfficerBookingHistoryComponent {
  customerId: string = '';
  startDate: string = '';
  endDate: string = '';
  bookings: any[] = [];

  constructor(private historyService: OfficerBookingHistoryService) {}

  fetchBookingHistory() {
    if (!this.customerId || !this.startDate || !this.endDate) {
      alert('Please enter Customer ID, Start Date, and End Date.');
      return;
    }
    this.historyService.getBookingHistory(this.customerId, this.startDate, this.endDate)
      .subscribe({
        next: (data) =>{ this.bookings = data || [],
        console.log('Bookings:', this.bookings);},
        error: () => this.bookings = []
      });
  }
}
