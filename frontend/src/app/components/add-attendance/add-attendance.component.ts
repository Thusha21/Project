import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css']
})
export class AddAttendanceComponent implements OnInit {
 form :FormGroup
 classArray=[];
 studentArray=[];
   attendanceId='';
   editAttendance:any
   isEdit=false;
  constructor(private fb:FormBuilder,private attendanceService:AttendanceService,private router:Router,private route:ActivatedRoute,
    private classService:ClassService,private studentService:StudentService) { }

  ngOnInit(): void {
    this.attendanceId=this.route.snapshot.queryParams['attendanceId']
      console.log(this.attendanceId);
      if(this.attendanceId){
        this.isEdit=true;
        this.attendanceService.getSingleAttendance(this.attendanceId).subscribe(res => {
          console.log(res['token'].attendance);
          this.editAttendance = res['token'].attendance
         
           this.form = this.fb.group({
           IsAttend: [this.editAttendance.isAttend],
           classId:[this.editAttendance.classId],
           studentId:[this.editAttendance.studentId]

          });
        })
      }
      else{
        this.form = this.fb.group({
          IsAttend:['',[Validators.required]],
         classId:['',[Validators.required]],
         studentId:['',[Validators.required]]
        });
      }
      this.classService.getAllClasses().subscribe(res=>{
        console.log(res);
      this.classArray = res.token.classes
      
      })
      this.studentService.getAllStudents().subscribe(res=>{
        console.log(res);
      this.classArray = res.token.students
       })
      }
  
  onSubmit(form){
    if(this.form.valid){
       this.attendanceService.saveAttendance(form).subscribe(res=>{
         if(res){
           this.router.navigate(['/attendances'])
         }
       })
    }
   }
  
   onUpdate(form) {
    console.log(this.attendanceId);
    this.attendanceService.updateAttendance(form,this.attendanceId).subscribe(res => {
      if (res){
        this.router.navigate(['/attendances']);
      }
    })
  }
  
  }
