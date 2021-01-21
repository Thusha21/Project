import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css']
})
export class StaffDetailsComponent implements OnInit {
  staff: any
  hasBalance = false;
  constructor(private staffService:StaffService,private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const staffId = this.route.snapshot.queryParams['staffId']
    console.log(staffId);

    this.staffService.getSingleStaff(staffId).subscribe(res => {
      console.log(res['token'].staff);
      this.staff = res['token'].staff;

    })

  }
  deleteClient() {
    this.staffService.deleteStaff(this.staff._id).subscribe(res => {
      if (res) {
        this.router.navigate(['/staffs'])
      }

    });
  }
  editClient() {
    this.router.navigate(['/add-staff'], { queryParams: { staffId: this.staff._id } })
  }



}
