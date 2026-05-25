import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { checkId } from '../../services/check-id.service';
import { validateIds } from '../../services/validate-ids.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register-container',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf,CommonModule],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.css'
})

export class RegisterContainerComponent {
  
  constructor(private router:Router,private registerobj:RegisterService,private checkid: checkId){ }
  registerPage = new FormGroup(
    {
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      mobile: new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      userid: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      
    }
  )

  get userid(){
    return this.registerPage.get('userid');
  }
  
  get name(){
    return this.registerPage.get('name');
  }
  get email(){
    return this.registerPage.get('email');
  }
  
  get mobile(){
    return this.registerPage.get('mobile');
  }
  get address(){
    return this.registerPage.get('address');
  }
  
  get password(){
    return this.registerPage.get('password');
  }

  onSubmit(){
    const data = {
      "userId" : this.userid?.value,
      "fullName" : this.name?.value,
      "email" : this.email?.value,
      "mobileNumber" : this.mobile?.value,
      "address": this.address?.value,
      "password" : this.password?.value,
      "role" : "defaut"
    }

    this.registerobj.register(data).subscribe((response)=>{
      if(response!=null)this.router.navigate(["/loginPage"])},error=>{
        console.error('Error occurred during post request',error);
      });
  }

}
