import { Component } from '@angular/core';
import { ParcelService } from '../services/parcel.service';
import { OfficerService } from '../services/officer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-status',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './update-status.component.html',
  styleUrl: './update-status.component.css'
})
export class UpdateStatusComponent {

   parcelId!: number;
  status!: string;
  responseMessage = '';

  constructor(private officerService: OfficerService) {}

  onSubmit() {
    this.officerService.updateParcelStatus(this.parcelId, this.status).subscribe({
      next: (response) => {
        alert('Status updated');
        this.responseMessage = 'Parcel status updated successfully!';
      },
      error: (err) => {
        this.responseMessage = 'Failed to update status.';
        alert('failed');
        console.error(err);
      }
    });
  }


}
