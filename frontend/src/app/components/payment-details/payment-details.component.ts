import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  payment: any
  hasBalance = false;
  constructor(private paymentService:PaymentService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const paymentId = this.route.snapshot.queryParams['paymentId']
    console.log(paymentId);

    this.paymentService.getSinglePayment(paymentId).subscribe(res => {
      console.log(res['token'].payment);
      this.payment = res['token'].payment;

    })

  }
  deleteClient() {
    this.paymentService.deletePayment(this.payment._id).subscribe(res => {
      if (res) {
        this.router.navigate(['/payments'])
      }

    });
  }

}
