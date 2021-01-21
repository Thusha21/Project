import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classArray = [];
  classesCount: Number;
  p:number=1;
  public searchText : string;

  constructor(private classService:ClassService, private router: Router) { }

  ngOnInit(): void {
    this.classService.getAllClasses().subscribe(res => {
      console.log(res);
     
      this.classArray = res.token.cls
      this.classesCount = res.token.count
     
    })
  }
  toClassDetails(id) {
    this.router.navigate(['/class'], { queryParams: { classId: id } })
  }

}


  


