import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stderr } from 'process';
import { PaymentService } from 'src/app/services/payment.service';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
form:FormGroup
 subjectArray=[];
 studentArray=[];
 total=0;
  constructor(private fb :FormBuilder,private paymentService:PaymentService,private router:Router,
    private subjectService:SubjectService,private studentService:StudentService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount:['',[Validators.required,Validators.min(500),Validators.max(5000),Validators.pattern('^[0-9]*$')]],
      isPay:['',[Validators.required]],
      date:['',[Validators.required]],
      studentId:['',[Validators.required]]
    });

    this.studentService.getAllStudents().subscribe(res=>{
      console.log(res);
      this.studentArray = res.token.students
    })
    // this.subjectService.getAllSubjects().subscribe(res=>{
    //   console.log(res);
    //   this.subjectArray = res.token.subjects
    // })

  }
  onSubmit(form){
    if(this.form.valid){
       this.paymentService.savePayment(form).subscribe(res=>{
         if(res){
           this.router.navigate(['/payments'])
         }
       })
    }
   }
   studentSelected(event) {
     let student = this.studentArray.find(st=>st._id === event.value)
     this.subjectArray = student.subject;
     this.total =0
      this.subjectArray.forEach(sub=> {

        this.total = this.total+sub.fee
      })
      console.log(this.total);
      this.form.controls['amount'].setValue(this.total);

   }


}
