import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { MustMatch } from 'src/app/helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 form:FormGroup
  submitted = false;
 hide=true;
  constructor(private fb :FormBuilder,private authService:AuthService,private router:Router) { }

  public get confirmPasswordMismatch() {
    return (this.form.get('password').dirty || this.form.get('confirmPassword').dirty) && this.form.hasError('confirmedDoesNotMatch');
}

  ngOnInit(): void {
    this.form = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      email:['',[Validators.required,Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" )]],
      password:['',[Validators.required]],
      // confirmPassword:['',Validators.required],
      userRole:['',[Validators.required]],
      
    });
    //   {
    //     validator: MustMatch('password', 'confirmPassword')
      
    // });
  }
  get f() {
     return this.form.controls;
   }


  onSubmit(form){
    if(this.form.valid){
       this.authService.signup(this.form.value).subscribe(res=>{
        if(res){
          console.log(res)
          this.router.navigate(['/'])
        }
       })
         //err=>console.log(err)
         this.submitted = true;

         // stop here if form is invalid
         if (this.form.invalid) {
             return;
         }
 
         alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value))
     }
     }
    }
  
     
   
  
   
