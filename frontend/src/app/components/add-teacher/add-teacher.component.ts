import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
 form:FormGroup
  teacherId='';
  editTeacher:any
  isEdit=false;
  constructor(private fb :FormBuilder,private teacherService:TeacherService,private router:Router, private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
   this.teacherId=this.route.snapshot.queryParams['teacherId']
    console.log(this.teacherId);
    if(this.teacherId){
      this.isEdit=true;
      this.teacherService.getSingleTeacher(this.teacherId).subscribe(res => {
        console.log(res['token'].teacher);
        this.editTeacher = res['token'].teacher
        this.form = this.fb.group({
          name: [this.editTeacher.name],
          age: [this.editTeacher.age],
          address: [this.editTeacher.address],
          gender:[this.editTeacher.gender],
          telephoneNo:[this.editTeacher.telephoneNo],
          salary:[this.editTeacher.salary]
        });
      })
    }else{
      this.form = this.fb.group({
      
        name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        address:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
        gender:['',[Validators.required]],
        age: ['',[Validators.required,Validators.min(20),Validators.max(45),Validators.pattern('^[0-9]*$')]],
        telephoneNo:['',[Validators.required,Validators.maxLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        salary: ['',[Validators.required,Validators.min(3000),Validators.max(20000),Validators.pattern('^[0-9]*$')]]
       });

    }
    
  }
  onSubmit(form){
    if(this.form.valid){
       this.teacherService.saveTeacher(form).subscribe(res=>{
         if(res){
           this.router.navigate(['/teachers'])
         }
       })
    }
   }


  onUpdate(form) {
    console.log(this.teacherId);
    
    this.teacherService.updateTeacher(form,this.teacherId).subscribe(res => {
      if (res){
        this.router.navigate(['/teachers']);
      }
    })
  }
 
}
