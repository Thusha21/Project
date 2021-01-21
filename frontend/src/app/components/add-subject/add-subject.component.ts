import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  form :FormGroup
  teacherArray:any=[];
   subjectId='';
   editSubject:any
   isEdit=false;
  constructor(private fb : FormBuilder,private subjectService:SubjectService,private router:Router,private route:ActivatedRoute,
    private teacherService:TeacherService) { }

  ngOnInit(): void {

    this.subjectId=this.route.snapshot.queryParams['subjectId']
    console.log(this.subjectId);
    if(this.subjectId){
      this.isEdit=true;
      this.subjectService.getSingleSubject(this.subjectId).subscribe(res => {
        console.log(res['token'].subject);
        this.editSubject = res['token'].subject
        this.form = this.fb.group({
          name: [this.editSubject.name],
          fee: [this.editSubject.fee],
          teacherId: [this.editSubject.teacherId]
        });
      })
    }else{

      this.form = this.fb.group({
        name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        fee:['',[Validators.required,Validators.min(100),Validators.max(500),Validators.pattern('^[0-9]*$')]],
        teacherId:['',[Validators.required]]


      });

    }

    this.teacherService.getAllTeachers().subscribe(res=>{
      console.log(res);
      this.teacherArray = res.token.teachers

    })

  }



  onSubmit(form){

    // if(this.form.valid){

    //    this.subjectService.saveSubject(form).subscribe(res=>{
    //      if(res){
    //        this.router.navigate(['/subjects'])
    //      }
    //    })
    // }
   console.log(form);


   }
   onUpdate(form) {
    console.log(this.subjectId);

    this.subjectService.updateSubject(form,this.subjectId).subscribe(res => {
      if (res){
        this.router.navigate(['/subjects']);
      }
    })
  }

}
