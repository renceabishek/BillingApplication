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
      product_id: ['', Validators.required]
    });
  }

  getSettings() {
    this.setService.getSettings().subscribe(data=> {
      this.btnValue = "Save";
      this.settingForm.setValue({
        customer_id : data[0].customer_id,
        product_id : data[0].product_id
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
    var obj = {
      "customer_id" : custoermid,
      "product_id" : productid,
      "_id" : this.id
    }
    if(this.btnValue=='Save') {
      this.setService.saveSettings(obj).subscribe(t => {
        this.getSettings();
      });
    } else {
      this.setService.editSettings(obj).subscribe(t=>{
        this.getSettings();
      });
    }    
    
  }
}
