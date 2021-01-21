import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  paymentArray=[];
  paymentsCount:Number;
  p:number=1;
  date:string;
  public searchText : string;
  constructor(private paymentService:PaymentService,private router:Router) { }

  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe(res=>{
      console.log(res);
      
    this.paymentArray = res.token.payments
    this.paymentsCount = res.token.count
    })
  }
  
  toPaymentDetails(id) {
    this.router.navigate(['/payment'], { queryParams: { paymentId: id } })
  }

}
