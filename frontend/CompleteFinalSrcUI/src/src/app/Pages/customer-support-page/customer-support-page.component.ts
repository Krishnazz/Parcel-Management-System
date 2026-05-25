import { Component } from '@angular/core';
import { CustomerSupportComponent } from "../../Components/customer-support/customer-support.component";

@Component({
  selector: 'app-customer-support-page',
  standalone: true,
  imports: [CustomerSupportComponent],
  templateUrl: './customer-support-page.component.html',
  styleUrl: './customer-support-page.component.css'
})
export class CustomerSupportPageComponent {

}
