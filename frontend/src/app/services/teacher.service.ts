import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  saveTeacher(form){
    const teacher = {
      name:form.get('name').value,
      address:form.get('address').value,
      gender:form.get('gender').value,
      age:form.get('age').value,
      salary:form.get('salary').value,
      telephoneNo:form.get('telephoneNo').value
      
    }
    
    return this.http.post<any>('http://localhost:3000/teachers',teacher);
  }
  getAllTeachers() {
    return this.http.get<any>('http://localhost:3000/teachers');

  }
  updateTeacher(form,teacherId){
   
    const teacher = [
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
        propName:'age', value:form.get('age').value
      },
      {
        propName:'gender', value:form.get('gender').value
      },
      
      {
        propName:'telephoneNo', value:form.get('telephoneNo').value
      }
    ]
    return this.http.patch<any>('http://localhost:3000/teachers/'+teacherId,teacher);
  }

  getSingleTeacher(id){
    return this.http.get('http://localhost:3000/teachers/'+id)  
  }
  deleteTeacher(id){
    return this.http.delete('http://localhost:3000/teachers/'+id)
  }

}
