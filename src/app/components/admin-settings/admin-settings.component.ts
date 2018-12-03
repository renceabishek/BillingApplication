import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  settingForm: FormGroup;
  btnValue : String;
  id : any;
  constructor(private setService:SettingsService,private fb:FormBuilder) { 
    this.CreateForm();
  }

  ngOnInit() {
    this.getSettings();
  }

  CreateForm() {
    this.settingForm = this.fb.group({
      customer_id: ['', Validators.required],
      product_id: ['', Validators.required],
      invoice_no: ['', Validators.required],
      owner_name: [''],
      owner_mobno: [''],
      owner_shname: [''],
      owner_street: [''],
      owner_city: [''],
      owner_gstin: [''],
      owner_email: ['']
    });
  }

  getSettings() {
    this.setService.getSettings().subscribe(data=> {
      this.btnValue = "Save";
      this.settingForm.setValue({
        customer_id : data[0].customer_id,
        product_id : data[0].product_id,
        invoice_no : data[0].invoice_no,
        owner_name : data[0].owner_name,
        owner_mobno : data[0].owner_mobno,
        owner_shname : data[0].owner_shname,
        owner_street : data[0].owner_street,
        owner_city : data[0].owner_city,
        owner_gstin : data[0].owner_gstin,
        owner_email : data[0].owner_email
      });
      this.id = data[0]._id;
      var nc=data[0].customer_id;
      if(nc>0){
        this.btnValue ="Update"
      } else {
        this.btnValue = "Save";
      }
    });
  }

  SaveSettings(){
    var custoermid = this.settingForm.get('customer_id').value;
    var productid = this.settingForm.get('product_id').value;
    var invoice_no = this.settingForm.get('invoice_no').value;

    var owner_name = this.settingForm.get('owner_name').value;
    var owner_mobno = this.settingForm.get('owner_mobno').value;
    var owner_shname = this.settingForm.get('owner_shname').value;
    var owner_street = this.settingForm.get('owner_street').value;
    var owner_city = this.settingForm.get('owner_city').value;
    var owner_gstin = this.settingForm.get('owner_gstin').value;
    var owner_email = this.settingForm.get('owner_email').value;
    
    if(this.btnValue=='Save') {
      var obj = {
        "customer_id" : custoermid,
        "product_id" : productid,
        "invoice_no" : invoice_no,
        "owner_name" : owner_name,
        "owner_mobno" :owner_mobno,
        "owner_shname" : owner_shname,
        "owner_street" :owner_street,
        "owner_city": owner_city,
        "owner_gstin" : owner_gstin,
        "owner_email" :owner_email
      }
      this.setService.saveSettings(obj).subscribe(t => {
        this.getSettings();
      });
    } else {
      var objedit = {
        "customer_id" : custoermid,
        "product_id" : productid,
        "invoice_no" : invoice_no,
        "owner_name" : owner_name,
        "owner_mobno" :owner_mobno,
        "owner_shname" : owner_shname,
        "owner_street" :owner_street,
        "owner_city": owner_city,
        "owner_gstin" : owner_gstin,
        "owner_email" :owner_email,
        "_id" : this.id
      }
      console.log('value'+objedit._id);
      this.setService.editSettings(objedit).subscribe(t=>{
        this.getSettings();
      });
    }    
    
  }
}
