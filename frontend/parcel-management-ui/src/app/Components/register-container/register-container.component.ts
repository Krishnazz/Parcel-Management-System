import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { checkId } from '../../services/check-id.service';
import { validateIds } from '../../services/validate-ids.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register-container',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.css'
})

export class RegisterContainerComponent implements OnInit {

  registerPage!: FormGroup;


  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if (!password || !confirmPassword) return null;
      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }


  roles!:string;
  constructor(private router:Router,private registerobj:RegisterService,private checkid: checkId){ }
  ngOnInit() {
    this.registerPage = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      address: new FormControl('', [Validators.required]),
      userid: new FormControl(
        '',
        [Validators.required],
        [validateIds(this.checkid)]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#&*]).{8,30}$")
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('')
    }, { validators: this.passwordMatchValidator() });
  }
  

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
  get role(){
    return this.registerPage.get('role');
  }

  onSubmit(){
    this.roles ="user";
    if(this.role?.value)this.roles="admin";
    const data = {
      "userId" : this.userid?.value,
      "fullName" : this.name?.value,
      "email" : this.email?.value,
      "mobileNumber" : this.mobile?.value,
      "address": this.address?.value,
      "password" : this.password?.value,
      "role" : this.roles
    }
    this.registerobj.register(data).subscribe((response)=>{
      if(response!=null)this.router.navigate(["/loginPage"])},error=>{
        console.error('Error occurred during post request',error);
      });
  }

}
