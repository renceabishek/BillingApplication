import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  uri = 'http://localhost:4000/customer';

  constructor(private http: HttpClient) { }

  addCustomer(inputMap) {
    console.log('print '+inputMap[0]);
    return this.http.post(`${this.uri}/add`, inputMap);
  }

  getCustomers(): Observable<Object> {
    return this.http.get(`${this.uri}`);
  }

  editCustomer(inputMap) {
    console.log('me');
    return this.http.post(`${this.uri}/edit/${inputMap.customer_id}`, inputMap);
  }
  deleteCustomer(inputMap) {
    var id = inputMap.product
    return this.http.post(`${this.uri}/delete/${id}`, inputMap);
  }

}
