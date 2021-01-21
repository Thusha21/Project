import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
   form:FormGroup
   staffId='';
   editStaff:any
   isEdit=false;
  constructor(private fb : FormBuilder, private staffService: StaffService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.staffId=this.route.snapshot.queryParams['staffId']
    console.log(this.staffId);
    if(this.staffId){
      this.isEdit=true;
      this.staffService.getSingleStaff(this.staffId).subscribe(res => {
        console.log(res['token'].staff);
        this.editStaff = res['token'].staff
        this.form = this.fb.group({
          name: [this.editStaff.name],
          address: [this.editStaff.address],
          gender:[this.editStaff.gender],
          telephoneNo: [this.editStaff.telephoneNo],
          position: [this.editStaff.position],
          salary: [this.editStaff.salary]
    
        });
      })
    }else{
      this.form = this.fb.group({
        name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        address:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
        gender:['',[Validators.required]],
        telephoneNo:['',[Validators.required,Validators.maxLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        position:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9]*$')]],
        salary:['',[Validators.required,Validators.min(3000),Validators.max(20000),Validators.pattern('^[0-9]*$')]]
      });
    }
    
  }

onSubmit(form){
  if(this.form.valid){
     this.staffService.saveStaff(form).subscribe(res=>{
       if(res){
         this.router.navigate(['/staffs'])
       }
     })
  }
 }

 onUpdate(form) {
  console.log(this.staffId);
  
  this.staffService.updateStaff(form,this.staffId).subscribe(res => {
    if (res){
      this.router.navigate(['/staffs']);
    }
  })
}

}
