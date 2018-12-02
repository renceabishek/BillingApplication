import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ProductUnit } from '../../../../models/ProductUnit';
import { SettingsService } from '../../services/settings.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  lstProducts: ProductUnit[];
  btnValue: String = "Add";
  selectedProduct: String;
  rowData: any;
  productForm = new FormGroup({
    productid: new FormControl('', [Validators.required]),
    productname: new FormControl('', [Validators.required]),
    hsn: new FormControl('', [Validators.required]),
    mrp: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required]),
    tamilname: new FormControl('', [Validators.required])
  });

  columnDefs = [{ headerName: 'Product ID', field: 'productid' , width:150},
  { headerName: 'Product Name', field: 'productname', width:280 },
  { headerName: 'HSN', field: 'hsn' , width:150},
  { headerName: 'MRP', field: 'mrp' , width:150},
  { headerName: 'Rate', field: 'rate' , width:150},
  { headerName: 'Product Name in Tamil', field: 'tamilname' , width:280}];
  constructor(private prodservice: ProductService,private setService: SettingsService) { }

  ngOnInit() {
    this.getProducts();
    this.selectedProduct = null;
  }

  settingsval : any;
  getProductId() {    
    this.setService.getSettings().subscribe(data=>{
      this.settingsval=data;
      console.log(this.settingsval[0].product_id);
    });
    this.setService.saveSettings
  }

  addProduct() {
    var customerid = this.getProductId();
    var productid = this.productForm.get('productid').value;
    var productname = this.productForm.get('productname').value;
    var hsn = this.productForm.get('hsn').value;
    var mrp = this.productForm.get('mrp').value;
    var rate = this.productForm.get('rate').value;
    var tamilname = this.productForm.get('tamilname').value;
    var inputMap = { "productid": productid, "productname": productname, "hsn": hsn, "mrp": mrp, "rate": rate, "tamilname": tamilname };
    if (this.btnValue === 'Add') {
      this.prodservice.addProducts(inputMap).subscribe(t => {
        this.getProducts();
      });
    } else {
      this.prodservice.editProduct(inputMap).subscribe(t => {
        this.getProducts();
      });
    }
    this.clearFields();
  }
  clearFields() {
    this.productForm.reset();
    this.btnValue = 'Add';
    this.selectedProduct = null;
  }
  getProducts() {
    this.rowData = this.prodservice.getProducts();
  }
  deleteProduct() {
    if (this.selectedProduct) {
      var inputMap = { product: this.selectedProduct };
      this.prodservice.deleteProduct(inputMap).subscribe(t => {
        this.getProducts();
      });
      this.clearFields();
    }
  }
  onRowClicked(event: any) {
    this.selectedProduct = event.data.productid;
    this.productForm.setValue({
      productid: event.data.productid,
      productname: event.data.productname,
      hsn: event.data.hsn,
      mrp: event.data.mrp,
      rate: event.data.rate,
      tamilname: event.data.tamilname
    });
    this.btnValue = "Edit";
  }
}

