import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  class: any
  hasBalance = false;
  constructor(private classService:ClassService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const classId = this.route.snapshot.queryParams['classId']
    console.log(classId);

    this.classService.getSingleClass(classId).subscribe(res => {
      console.log(res['token'].cls);
      
      this.class = res['token'].cls;

    })

  }
  deleteClient() {
    this.classService.deleteClass(this.class._id).subscribe(res => {
      if (res) {
        this.router.navigate(['/classes'])
      }

    });
  }
  editClient() {
    this.router.navigate(['/add-class'], { queryParams: { classId: this.class._id } })
  }



}

