import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {
  teacher: any
  hasBalance = false;
  constructor(private teacherService:TeacherService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const teacherId = this.route.snapshot.queryParams['teacherId']
    console.log(teacherId);

    this.teacherService.getSingleTeacher(teacherId).subscribe(res => {
      console.log(res['token'].teacher);
      this.teacher = res['token'].teacher;

    })

  }

  deleteClient() {
    this.teacherService.deleteTeacher(this.teacher._id).subscribe(res => {
      if (res) {
        this.router.navigate(['/teachers'])
      }

    });
  }
  editClient() {
    this.router.navigate(['/add-teacher'], { queryParams: { teacherId: this.teacher._id } })
  }


}
