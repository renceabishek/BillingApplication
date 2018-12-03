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

  columnDefs = [{ headerName: 'Customer ID', field: 'customer_id', width: 150 },
  { headerName: 'Customer Name', field: 'customer_name', width: 280 },
  { headerName: 'Mobile No', field: 'customer_mobno', width: 150 },
  { headerName: 'Buyers Code', field: 'customer_buyerscode', width: 150 },
  { headerName: 'TIN No', field: 'customer_tinno', width: 150 },
  { headerName: 'State', field: 'customer_state', width: 280 },
  { headerName: 'Mobile No', field: 'customer_email', width: 280 },
  { headerName: 'Address', field: 'customer_address', width: 280 },
  { headerName: 'PIN Code', field: 'customer_pincode', width: 280 },
  { headerName: 'Remarks', field: 'customer_remarks', width: 280 }];

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

  async addCustomer() {
    if (this.btnValue === 'Add') {
      this.globalcustomerid = <Number>await this.getCustomerId();
      console.log('id' + this.globalcustomerid);
    } else {
      this.globalcustomerid = this.selectedCustomer;
    }
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
      console.log('-->inside');
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
    this.selectedCustomer = event.data.customer_id;
    this.cusForm.setValue({
      customer_name: event.data.customer_name,
      customer_mobno: event.data.customer_mobno,
      customer_buyerscode: event.data.customer_buyerscode,
      customer_tinno: event.data.customer_tinno,
      customer_state: event.data.customer_state,
      customer_address: event.data.customer_address,
      customer_email: event.data.customer_email,
      customer_remarks: event.data.customer_remarks,
      customer_pincode: event.data.customer_pincode
    });
    this.btnValue = "Update";
  }

  // Fetch Unique CutomerID from settings DB
  getCustomerId() {
    return new Promise(resolve => {
      this.setService.getSettings().subscribe(data => {
        var retVal = data[0].customer_id + 1;
        var obj = {
          "product_id": data[0].product_id,
          "customer_id": retVal,
          "invoice_no": data[0].invoice_no,
          "owner_name": data[0].owner_name,
          "owner_mobno": data[0].owner_mobno,
          "owner_shname": data[0].owner_shname,
          "owner_street": data[0].owner_street,
          "owner_city": data[0].owner_city,
          "owner_gstin": data[0].owner_gstin,
          "owner_email": data[0].owner_email,
          "_id": data[0]._id
        }
        this.setService.editSettings(obj).subscribe(t => {
          console.log('completed');
        });
        console.log(retVal);
        resolve(retVal);
      });
    });
  }
}
