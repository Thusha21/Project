import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  savePayment(form){
    const payment = {
      date:form.get('date').value,
      amount:form.get('amount').value,
      isPay:form.get('isPay').value,
      studentId:form.get('studentId').value
      
    }
    
    return this.http.post<any>('http://localhost:3000/payments',payment);
  }
  getAllPayments() {
    return this.http.get<any>('http://localhost:3000/payments');

  }
  updatePayment(form,paymentId){
   
    const payment = [
      {
        propName:'date', value:form.get('date').value
      },
      {
        propName:'amount', value:form.get('amount').value
      },
      {
        propName:'isPay', value:form.get('isPay').value
      },
      {
        propName:'studentId', value:form.get('studentId').value
      }
     
      
    ]
    return this.http.patch<any>('http://localhost:3000/staffs/'+paymentId,payment);
  }


  getSinglePayment(id){
    return this.http.get('http://localhost:3000/payments/'+id)  
  }
  deletePayment(id){
    return this.http.delete('http://localhost:3000/payments/'+id)
  }


}
