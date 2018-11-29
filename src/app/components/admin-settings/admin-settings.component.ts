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
  constructor(private setService:SettingsService,private fb:FormBuilder) { 
    this.CreateForm();
  }

  ngOnInit() {
  }

  CreateForm() {
    this.settingForm = this.fb.group({
      customer_id: ['', Validators.required],
      product_id: ['', Validators.required]
    });
  }


  SaveSettings(){
    var custoermid = this.settingForm.get('customer_id').value;
    var productid = this.settingForm.get('product_id').value;
    var obj = {
      "custoerm_id" : custoermid,
      "product_id" : productid
    }
    alert('check');
    this.setService.saveSettings(obj).subscribe(t => {
      console.log('che');
    });;
  }
}
