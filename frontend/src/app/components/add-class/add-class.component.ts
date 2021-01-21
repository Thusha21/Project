import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
 form :FormGroup
 subjectArray=[];
   classId='';
   editClass:any
   isEdit=false;

  constructor(private fb :FormBuilder, private classService:ClassService,private router:Router,
    private subjectService:SubjectService, private route:ActivatedRoute) { }

    ngOnInit(): void {
      this.classId=this.route.snapshot.queryParams['classId']
      console.log(this.classId);
      if(this.classId){
        this.isEdit=true;
        this.classService.getSingleClass(this.classId).subscribe(res => {
          console.log(res['token'].cls);
          this.editClass = res['token'].cls
          this.form = this.fb.group({
           date: [this.editClass.date],
            time:[this.editClass.time],
            subjectId:[this.editClass.subjectId]

          });
        })
      }else{
        this.form = this.fb.group({
           date:['',[Validators.required]],
          time:['',[Validators.required]],
          subjectId:['',[Validators.required]]
        });
      }
      this.subjectService.getAllSubjects().subscribe(res=>{
        console.log(res);
      this.subjectArray = res.token.subjects

      })

    }

  onSubmit(form){

    if(this.form.valid){

       this.classService.saveClass(form).subscribe(res=>{
         console.log(res);

         if(res){
           this.router.navigate(['/classes'])
         }
       })
    }
   }

   onUpdate(form) {
    console.log(this.classId);

    this.classService.updateClass(form,this.classId).subscribe(res => {
      if (res){
        this.router.navigate(['/classes']);
      }
    })
  }

  }
