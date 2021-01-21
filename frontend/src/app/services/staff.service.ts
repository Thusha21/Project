//import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http:HttpClient) { }
  saveStaff(form){
    const staff = {
      name:form.get('name').value,
      address:form.get('address').value,
      gender:form.get('gender').value,
      telephoneNo:form.get('telephoneNo').value,
      salary:form.get('salary').value,
      position:form.get('position').value,

    }
   
    return this.http.post<any>('http://localhost:3000/staffs',staff);
  }
  getAllStaffs() {
    return this.http.get<any>('http://localhost:3000/staffs');

  }
  updateStaff(form,staffId){
   
    const staff = [
      {
        propName:'name', value:form.get('name').value
      },
      {
        propName:'address', value:form.get('address').value
      },
      {
        propName:'salary', value:form.get('salary').value
      },
      {
        propName:'gender', value:form.get('gender').value
      },
      {
        propName:'telephoneNo', value:form.get('telephoneNo').value
      },
      {
        propName:'position', value:form.get('position').value
      }
    ]
    return this.http.patch<any>('http://localhost:3000/staffs/'+staffId,staff);
  }

  getSingleStaff(id){
    return this.http.get('http://localhost:3000/staffs/'+id)  
  }
  deleteStaff(id){
    return this.http.delete('http://localhost:3000/staffs/'+id)
  }


}
