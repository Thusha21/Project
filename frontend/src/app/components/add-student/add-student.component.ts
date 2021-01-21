import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
   form :FormGroup
  subjectArray=[];
  studentId='';
  editStudent:any
  isEdit=false;

 constructor(private fb:FormBuilder,private studentService:StudentService,private router:Router,private route:ActivatedRoute,
    private subjectService:SubjectService ) { }

  ngOnInit(): void {
    this.studentId=this.route.snapshot.queryParams['studentId']
    console.log(this.studentId);
    if(this.studentId){
      this.isEdit=true;
      this.studentService.getSingleStudent(this.studentId).subscribe(res => {
        console.log(res['token'].student);
        this.editStudent = res['token'].student

        this.form = this.fb.group({
          name: [this.editStudent.name],
          regNo: [this.editStudent.regNo],
          address: [this.editStudent.address],
          grade: [this.editStudent.grade],
          dob: [this.editStudent.dob],
          gender:[this.editStudent.gender],
          guardianName:[this.editStudent.guardianName],
          telephoneNo:[this.editStudent.telephoneNo],
          subjectId:[this.editStudent.subjectId]
        });
      })
    }else{
      this.form = this.fb.group({
        name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
        regNo:['',[Validators.required]],
        address:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
        grade: ['',[Validators.required,Validators.min(1),Validators.max(11),Validators.pattern('^[0-9]*$')]],
        dob:['',[Validators.required]],
        gender:['',[Validators.required]],
        telephoneNo:['',[Validators.required,Validators.maxLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        guardianName:['',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]],
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
      this.studentService.saveStudent(form)
      .subscribe(res=>{
        if(res){
          this.router.navigate(['/students'])
        }
      })
   }
  }
  onUpdate(form) {
    console.log(this.studentId);

    this.studentService.updateStudent(form,this.studentId).subscribe(res => {
      if (res){
        this.router.navigate(['/students']);
      }
    })
  }

}
