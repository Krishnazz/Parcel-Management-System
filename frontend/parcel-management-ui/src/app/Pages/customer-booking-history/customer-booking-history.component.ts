import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { UserHeaderComponent } from "../../Components/user-header/user-header.component";

@Component({
  selector: 'app-customer-booking-history',
  standalone: true,
  imports: [CommonModule, RouterModule, UserHeaderComponent],
  templateUrl: './customer-booking-history.component.html',
  styleUrls: ['./customer-booking-history.component.css']
})

export class CustomerBookingHistoryComponent implements OnInit {
  bookings: any[] = [];
  rowsPerPage = 2;
  currentPage = 1;
  obj :any = JSON.parse(sessionStorage.getItem('user')!); // Should come from auth service
  userId:string = this.obj.userId;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchBookingHistory();
  }

  fetchBookingHistory(): void {
    this.bookingService.getBookingHistory(this.userId).subscribe({
      next: (data) => {
        this.bookings = data.map((item: any[]) => ({
          customerId: item[0],
          bookingId: item[1],
          date: item[2],
          receiver: item[3],
          address: item[4],
          amount: item[5],
          status: item[6],
        }));
      },
      error: (err) => console.error('Error:', err)
    });
  }
  

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if ((this.currentPage * this.rowsPerPage) < this.bookings.length) {
      this.currentPage++;
    }
  }
  totalPages(): number {
    return Math.ceil(this.bookings.length / this.rowsPerPage);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}