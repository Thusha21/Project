import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { each } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  saveStudent(form){
  let subjectJson = [];
    form.get('subjectId').value.forEach(element => {
      let eachSubject = {}
      eachSubject =  {
        '_id':element
      }
      subjectJson.push(eachSubject)

    });
    console.log(subjectJson);

    const student = {
      name:form.get('name').value,
      regNo:form.get('regNo').value,
      address:form.get('address').value,
      dob:form.get('dob').value,
      gender:form.get('gender').value,
      grade:form.get('grade').value,
      guardianName:form.get('guardianName').value,
      telephoneNo:form.get('telephoneNo').value,
      subjectId:subjectJson

    }

    return this.http.post<any>('http://localhost:3000/students',student);
  }
  getAllStudents() {
    return this.http.get<any>('http://localhost:3000/students');

  }

  updateStudent(form,studentId){

    const student = [
      {
        propName:'name', value:form.get('name').value
      },
      {
        propName:'regNo', value:form.get('regNo').value
      },
      {
        propName:'address', value:form.get('address').value
      },
      {
        propName:'dob', value:form.get('dob').value
      },
      {
        propName:'grade', value:form.get('grade').value
      },
      {
        propName:'gender', value:form.get('gender').value
      },
      {
        propName:'guardianName', value:form.get('guardianName').value
      },
      {
        propName:'telephoneNo', value:form.get('telephoneNo').value
      },
      {
        propName:'subjectId', value:form.get('subjectId').value
      }
    ]
    return this.http.patch<any>('http://localhost:3000/students/'+studentId,student);
  }

  getSingleStudent(id){
    return this.http.get('http://localhost:3000/students/'+id)
  }
  deleteStudent(id){
    return this.http.delete('http://localhost:3000/students/'+id)
  }

}
