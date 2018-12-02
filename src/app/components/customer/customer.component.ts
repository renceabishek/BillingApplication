import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { SettingsService } from '../../services/settings.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  cusForm: FormGroup;
  btnValue: String;
  selectedCustomer: any;
  rowData: any;
  settingsval: any;
  globalcustomerid: Number;

  constructor(private custservice: CustomerService, private fb: FormBuilder,
    private setService: SettingsService) {
    this.CreateForm();
  }

  ngOnInit() {
    this.getCustomers();
    this.btnValue = "Add";
    this.selectedCustomer = null;
  }

  CreateForm() {
    this.cusForm = this.fb.group({
      customer_id: ['',],
      customer_name: ['', Validators.required],
      customer_mobno: ['', Validators.required],
      customer_buyerscode: ['', Validators.required],
      customer_tinno: [''],
      customer_state: [''],
      customer_email: [''],
      customer_address: [''],
      customer_pincode: [''],
      customer_remarks: ['']
    });
  }


  getCustomers() {
    this.rowData = this.custservice.getCustomers();

  }

  addCustomer() {
    this.setService.getSettings().subscribe(data => {
      var retVal = data[0].customer_id + 1;
      var obj = {
        "product_id": data[0].product_id,
        "customer_id": retVal,
        "_id": data[0]._id
      }
      this.setService.editSettings(obj).subscribe(t=>{
        console.log('completed');
      });
      console.log(retVal);
      this.globalcustomerid = retVal;
    });

    console.log('id' + this.globalcustomerid);
    var obj = {
      "customer_id": this.globalcustomerid,
      "customer_name": this.cusForm.get('customer_name').value,
      "customer_buyerscode": this.cusForm.get('customer_buyerscode').value,
      "customer_tinno": this.cusForm.get('customer_tinno').value,
      "customer_state": this.cusForm.get('customer_state').value,
      "customer_mobno": this.cusForm.get('customer_mobno').value,
      "customer_email": this.cusForm.get('customer_email').value,
      "customer_address": this.cusForm.get('customer_address').value,
      "customer_pincode": this.cusForm.get('customer_pincode').value,
      "customer_remarks": this.cusForm.get('customer_remarks').value
    };
    if (this.btnValue === 'Add') {
      console.log('in');
      this.custservice.addCustomer(obj).subscribe(t => {
        this.getCustomers();
      });

    } else {
      this.custservice.editCustomer(obj).subscribe(t => {
        this.getCustomers();
      });
    }



  }

  deleteCustomer() {
    if (this.selectedCustomer) {
      var inputMap = { product: this.selectedCustomer };
      this.custservice.deleteCustomer(inputMap).subscribe(t => {
        this.getCustomers();
      });
      this.clearFields();
    }
  }

  clearFields() {
    this.cusForm.reset();
    this.btnValue = 'Add';
    this.selectedCustomer = null;
  }

  onRowClicked(event: any) {
    this.selectedCustomer = event.data.customer_name
    this.cusForm.setValue({
      customer_name: event.data.customer_name,
      customer_mobno: event.data.customer_mobno,
      customer_buyerscode: event.data.customer_buyerscode,
      customer_tinno: event.data.customer_tinno,
      customer_state: event.data.customer_state,
      customer_address: event.data.customer_address,
      customer_email: event.data.customer_email,
      customer_remarks: event.data.customer_remarks,
      customer_pincode: event.data.customer_pincode,
    });
    this.btnValue = "Update";
  }

  // Fetch Unique CutomerID from settings DB
  getCustomerId() {


  }
}
