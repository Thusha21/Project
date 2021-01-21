import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { SearchfilterPipe } from 'src/app/searchfilter.pipe';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
 //subjectArray=[];
  public subjectArray : any;
  subjectsCount:Number;
  public searchText : string;
  p:number=1;
  constructor(private subjectService:SubjectService, private router:Router) { }

  ngOnInit(): void {
    this.subjectService.getAllSubjects().subscribe(res=>{
      console.log(res);
      
    this.subjectArray = res.token.subjects
    this.subjectsCount = res.token.count
    })

  }

  toSubjectDetails(id) {
    this.router.navigate(['/subject'], { queryParams: { subjectId: id } })
  }

}
