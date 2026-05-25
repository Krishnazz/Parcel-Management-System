import { Component } from '@angular/core';
import { UserHeaderComponent } from "../user-header/user-header.component";

@Component({
  selector: 'app-customer-support',
  standalone: true,
  imports: [UserHeaderComponent],
  templateUrl: './customer-support.component.html',
  styleUrl: './customer-support.component.css'
})
export class CustomerSupportComponent {

}
