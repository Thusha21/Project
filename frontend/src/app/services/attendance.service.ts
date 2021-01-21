import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http:HttpClient) { }
  saveAttendance(form){
    const attendance = {
      isAttend:form.get('isAttend').value,
      classId:form.get('classId').value,
      studentId:form.get('studentId').value

    }
    
    return this.http.post<any>('http://localhost:3000/attendances',attendance);
  }
  getAllAttendances() {
    return this.http.get<any>('http://localhost:3000/attendances');

  }updateAttendance(form,attendanceId){
   
    const attendance = [
      {
        propName:'isAttend', value:form.get('isAttend').value
      },
      {
        propName:'classId', value:form.get('classId').value
      },
      {
        propName:'studentId', value:form.get('studentId').value
      }
      
    ]
    return this.http.patch<any>('http://localhost:3000/attendances/'+attendanceId,attendance);
  }

  getSingleAttendance(id){
    return this.http.get('http://localhost:3000/attendances/'+id)  
  }
  deleteAttendance(id){
    return this.http.delete('http://localhost:3000/attendances/'+id)
  }

}


