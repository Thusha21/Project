import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentService } from 'src/app/services/student.service';
import { SearchfilterPipe } from 'src/app/searchfilter.pipe';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
   //studentArray=[];
   public studentArray : any;
   studentsCount:Number;
   public searchText : string;
   p:number=1;
  constructor(private studentService:StudentService, private router:Router) { }

  ngOnInit(): void { 
   
    this.studentService.getAllStudents().subscribe(res=>{
      console.log(res);
      
    this.studentArray = res.token.students
    this.studentsCount = res.token.count
    })
   
  }

  toStudentDetails(id) {
    this.router.navigate(['/student'], { queryParams: { studentId: id } })
  }

}
