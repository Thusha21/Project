import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css']
})
export class AttendancesComponent implements OnInit {
  attendanceArray = [];
  attendancesCount: Number;
  public searchText : string;
  p:number=1;

  constructor(private attendanceService:AttendanceService, private router: Router) { }

  ngOnInit(): void {
    this.attendanceService.getAllAttendances().subscribe(res => {
      console.log(res);
     
      this.attendanceArray = res.token.attendances;
      this.attendancesCount = res.token.count;
     
    })
  }
  toAttendanceDetails(id) {
    this.router.navigate(['/attendance'], { queryParams: { attendanceId: id } })
  }

}

