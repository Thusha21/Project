import { Component,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit{
  attendance: any
  hasBalance = false;

constructor(private attendanceService:AttendanceService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const attendanceId = this.route.snapshot.queryParams['attendanceId']
    console.log(attendanceId);

    this.attendanceService.getSingleAttendance(attendanceId).subscribe(res => {
      console.log(res['token'].attendance);
      
      this.attendance = res['token'].attendance;
    })

  }

       
  deleteClient() {
    this.attendanceService.deleteAttendance(this.attendance._id).subscribe(res => {
      if (res) {
        this.router.navigate(['/attendances'])
      }

    });
  }
  editClient() {
    this.router.navigate(['/add-attendance'], { queryParams: { attendanceId: this.attendance._id } })
  }
    }