import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private http: HttpClient) {}
  saveClass(form) {
    const cls = {
      date: form.get('date').value,
      time: form.get('time').value,
      subjectId: form.get('subjectId').value,
    };
    console.log(cls);

    return this.http.post<any>('http://localhost:3000/classes',cls);
  }
  getAllClasses() {
    return this.http.get<any>('http://localhost:3000/classes');
  }
  updateClass(form, classId) {
    const cls = [
      {
        propName: 'date',
        value: form.get('date').value,
      },
      {
        propName: 'time',
        value: form.get('time').value,
      },
      {
        propName: 'subjectId',
        value: form.get('subjectId').value,
      },
    ];
    return this.http.patch<any>(
      'http://localhost:3000/classes/' + classId,
      cls
    );
  }

  getSingleClass(id) {
    return this.http.get('http://localhost:3000/classes/' + id);
  }

  deleteClass(id) {
    return this.http.delete('http://localhost:3000/classes/' + id);
  }
}
