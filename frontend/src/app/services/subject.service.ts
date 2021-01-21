import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http:HttpClient) { }
  saveSubject(form){
    const subject = {
      name:form.get('name').value,
      fee:form.get('fee').value,
      teacherId:form.get('teacherId').value
      
    }
    
    return this.http.post<any>('http://localhost:3000/subjects',subject);
  }
  getAllSubjects() {
    return this.http.get<any>('http://localhost:3000/subjects');

  }

  updateSubject(form,subjectId){
   
    const subject = [
      {
        propName:'name', value:form.get('name').value
      },
      {
        propName:'fee', value:form.get('fee').value
      },
      {
        propName:'teacherId', value:form.get('teacherId').value
      }
     
    ]
    return this.http.patch<any>('http://localhost:3000/subjects/'+subjectId,subject);
  }

  getSingleSubject(id){
    return this.http.get('http://localhost:3000/subjects/'+id)  
  }
  deleteSubject(id){
    return this.http.delete('http://localhost:3000/subjects/'+id)
  }

}
