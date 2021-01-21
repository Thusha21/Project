
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {
  form:FormGroup
  userArray=[];
  hide = true;
  constructor(private fb:FormBuilder,
    private authService: AuthService,
     private router:Router,
    // private localstorageService:LocalStorageServie,
     private userService:UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({


      email:['',[Validators.required,Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" )]],
       password:['',[Validators.required,Validators.minLength(8)]]

     
      
    });
    this.userService.getAllUsers().subscribe(res=>{
      console.log(res);
     this.userArray = res.token.user
   
    })
    
  
  }

  onSubmit(form){
    if(this.form.valid){
       this.authService.login(this.form.value).subscribe(res=>{
        if(res){
          console.log(res)
          localStorage.setItem('token',res.token)

            this.router.navigate(['/'])

          
        }
        //err=>console.log(err)
       })
         
        
      
    }
   }

   
}

