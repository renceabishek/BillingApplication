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
  globalproductid : any;

  productForm = new FormGroup({
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
    return new Promise(resolve => {
      this.setService.getSettings().subscribe(data => {
        var retVal = data[0].product_id + 1;
        var obj = {
          "product_id": retVal,
          "customer_id": data[0].customer_id,
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

  async addProduct() {
    if(this.btnValue === 'Add') {
      this.globalproductid = <Number> await this.getProductId();
    } else {
      this.globalproductid = this.selectedProduct;
    }
    
    var productname = this.productForm.get('productname').value;
    var hsn = this.productForm.get('hsn').value;
    var mrp = this.productForm.get('mrp').value;
    var rate = this.productForm.get('rate').value;
    var tamilname = this.productForm.get('tamilname').value;
    var inputMap = { "productid": this.globalproductid, "productname": productname, "hsn": hsn, "mrp": mrp, "rate": rate, "tamilname": tamilname };
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

