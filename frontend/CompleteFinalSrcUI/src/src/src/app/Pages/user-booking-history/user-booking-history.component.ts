import { Component } from '@angular/core';
import { UserHeaderComponent } from '../../Components/user-header/user-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserBookingHistoryService } from '../../services/user-booking-history.service';

@Component({
  selector: 'app-user-booking-history',
  standalone: true,
  imports: [UserHeaderComponent,FormsModule,CommonModule],
  templateUrl: './user-booking-history.component.html',
  styleUrl: './user-booking-history.component.css'
})
export class UserBookingHistoryComponent {
  userId: string = '';
  bookings: any[] = [];

  constructor(private historyService: UserBookingHistoryService) {}

  ngOnInit() {
    // Example: Get userId from localStorage or your auth service
    this.userId = 'sk'; // Replace with actual logic to get userId
    // If userId is available, fetch booking history automatically
    if (this.userId) {
      this.fetchBookingHistory();
    }
  }

  fetchBookingHistory() {
    if (!this.userId) {
      alert('Please enter User ID');
      return;
    }
    this.historyService.getBookingHistory(this.userId).subscribe({
      next: (data) => this.bookings = data || [],
      error: () => this.bookings = []
    });
  }
}
