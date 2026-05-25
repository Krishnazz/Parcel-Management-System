import { Component } from '@angular/core';
import { RegisterContainerComponent } from "../../Components/register-container/register-container.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RegisterContainerComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
