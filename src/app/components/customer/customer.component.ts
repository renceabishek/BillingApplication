import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  cusForm: FormGroup;

  constructor(private custservice: CustomerService, private fb: FormBuilder) {
    this.CreateForm();
  }

  ngOnInit() {
    this.getCustomers();
  }

  CreateForm() {
    this.cusForm = this.fb.group({
      customer_id: ['', Validators.required],
      customer_name: ['', Validators.required],
      customer_mobno: ['', Validators.required],
      customer_buyerscode: ['', Validators.required],
      customer_tinno : [''],
      customer_state : [''],
      customer_email : [''],
      customer_address: [''],
      customer_pincode: [''],
      customer_remarks: ['']
    });
  }
  

  getCustomers(){
    this.custservice.getCustomers();
  }

  addCustomer() {
    console.log('--val'+this.cusForm.value.customer_name);
    this.custservice.addCustomer(this.cusForm.value);
    
  }
}
