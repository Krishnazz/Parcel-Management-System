import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css'
})

export class LoginContainerComponent {
  router:Router = new Router;
  loginValidate = new FormGroup(
    {
      userName: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    }
  );

  get f(){
    return this.loginValidate.controls;
  }
  constructor(private loginService:LoginServiceService) { }
  onSubmit(){ 

    const id =String(this.f.userName.value) ;
    const pwd = String(this.f.password.value);
    this.loginService.login(id,pwd).subscribe((response)=>{
      if(response!=null){
        console.log(response);
        sessionStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(["/userDashboard"])  
      }
    },error=>{
    console.error('Error occurred during Post request',error);
  });
     
    
  }
}
  