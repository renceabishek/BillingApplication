import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { CustomerUnit } from './customerUnit';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  angForm: FormGroup;
  CustomerUnit:CustomerUnit[];

  constructor(private custservice: CustomerService, private fb: FormBuilder) {
    this.CreateForm();
  }

  CreateForm() {
    this.angForm = this.fb.group({
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
  

  ngOnInit() {
    this.custservice.getCustomers().subscribe((data: CustomerUnit[]) => {
      this.CustomerUnit = data;
    });
  }

  addCustomer() {
    console.log('--val'+this.angForm.value.customer_name);
    this.custservice.addCustomer(this.angForm.value);
  }
}
