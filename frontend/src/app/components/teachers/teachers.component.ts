import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import {FormControl} from '@angular/forms';

import { SearchfilterPipe } from 'src/app/searchfilter.pipe';
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
 // teacherArray= [];
 public teacherArray : any;
  teachersCount:Number;
  teachername:string;
  address:string;
  gender:string;
  p:number=1;
  public searchText : string;
  
  constructor(private teacherService:TeacherService,private router:Router) { }

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe(res=>{
      console.log(res);
      
    this.teacherArray = res.token.teachers
    this.teachersCount = res.token.count

    
    })
    
  }
 

  
 /* Search(){
    if(! this.teacherArray || !this.name ){
      return this.teacherArray;
    }
    return this.teacherArray.filter(teacher =>
      teacher.name.toLocalLowerCase().includes(this.name.toLocaleLowerCase()));
  }*/
  /*Search(){
     return this.teacherArray =this.teacherArray.filter(teacher =>{
       teacher.Name.toLocaleLowerCase().includes(this.Name.toLocaleLowerCase());
    });
  }
  
    
   Search() {
  

    if (this.address  !== "") {
      this.teacherArray = this.teacherArray.filter((teacher: { address: string; }) => {
        return  teacher.address?.toLocaleLowerCase().match(this.address.toLocaleLowerCase()); 
    })
  } else if (this.address == "") {
    this.ngOnInit();
  }
}
 Search2() {
  
    if (this.teachername !== "") {
      this.teacherArray = this.teacherArray.filter((teacher: { teachername: string; }) => {
        return  teacher.teachername?.toLocaleLowerCase().match(this.teachername.toLocaleLowerCase()); 
    })
  } else if (this.teachername == "") {
    this.ngOnInit();
  }
  }
  

    if (this.gender !== "") {
      this.teacherArray = this.teacherArray.filter((teacher: { gender: string; }) => {
        return  teacher.gender?.toLocaleLowerCase().includes(this.gender.toLocaleLowerCase()); 
    })
  } else if (this.gender == "") {
    this.ngOnInit();
  }
  }*/

  toTeacherDetails(id) {
    this.router.navigate(['/teacher'], { queryParams: { teacherId: id } })
  }

}
