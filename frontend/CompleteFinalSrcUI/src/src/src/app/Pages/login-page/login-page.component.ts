import { Component } from '@angular/core';
import { LoginContainerComponent } from '../../Components/login-container/login-container.component';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginContainerComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
