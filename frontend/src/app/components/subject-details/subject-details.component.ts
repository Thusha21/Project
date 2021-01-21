import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {
  subject: any
  hasBalance = false;
  constructor(private subjectService:SubjectService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const subjectId = this.route.snapshot.queryParams['subjectId']
    console.log(subjectId);

    this.subjectService.getSingleSubject(subjectId).subscribe(res => {
      console.log(res['token'].subject)
     this.subject = res['token'].subject;

    })
  }
  deleteClient() {
    this.subjectService.deleteSubject(this.subject._id).subscribe(res => {
      if (res) {
        this.router.navigate(['/subjects'])
      }

    });
  }
  editClient() {
    this.router.navigate(['/add-subject'], { queryParams: { subjectId: this.subject._id } })
  }


}
