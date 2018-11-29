import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  uri = 'http://localhost:4000/customer';
  uri1= 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  addCustomer(customer) {
    const obj = {
      customer_id: customer.customer_id,
      customer_name: customer.customer_name,
      customer_buyerscode: customer.customer_buyerscode,
      customer_tinno: customer.customer_tinno,
      customer_state: customer.customer_state,
      customer_mobno: customer.customer_mobno,
      customer_email: customer.customer_email,
      customer_address: customer.customer_address,
      customer_pincode: customer.customer_pincode,
      customer_remarks: customer.customer_remarks
    };
    console.log('obje'+JSON.stringify(obj));
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done'));
  }

  getCustomers(): Observable<Object> {
    return this.http.get(`${this.uri}`);
  }

  editCustomer(inputMap) {
    // this.http.post(`${this.uri}/edit/${inputMap.productid}`, inputMap).subscribe(res => console.log('Done'));
    return this.http.post(`${this.uri}/edit/${inputMap.productid}`, inputMap);
  }
  deleteCustomer(inputMap) {
    var id = inputMap.product
    return this.http.post(`${this.uri}/delete/${id}`, inputMap);
  }

}
