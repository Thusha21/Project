import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.css']
})
export class StaffsComponent implements OnInit {
  //staffArray=[];
  public staffArray : any;
  staffsCount:Number;
  staffname:string;
  address:string;
  p:number=1;
  public searchText : string;
  constructor(private staffService:StaffService,private router:Router) { }

  ngOnInit(): void {

    this.staffService.getAllStaffs().subscribe(res=>{
      console.log(res);
      
    this.staffArray = res.token.staffs
    this.staffsCount = res.token.count
    })
  }
//   Search2() {
  
//     if (this.staffname !== "") {
//       this.staffArray = this.staffArray.filter((staff: { staffname: string; }) => {
//         return  staff.staffname?.toLocaleLowerCase().match(this.staffname.toLocaleLowerCase()); 
//     })
//   } else if (this.staffname == "") {
//     this.ngOnInit();
//   }
//   }
//   Search() {
  

//     if (this.address  !== "") {
//       this.staffArray = this.staffArray.filter((staff: { address: string; }) => {
//         return  staff.address?.toLocaleLowerCase().match(this.address.toLocaleLowerCase()); 
//     })
//   } else if (this.address == "") {
//     this.ngOnInit();
//   }
// }
  

  toStaffDetails(id) {
    this.router.navigate(['/staff'], { queryParams: { staffId: id } })
  }
 
}
