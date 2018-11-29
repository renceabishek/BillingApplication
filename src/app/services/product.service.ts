import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductUnit } from './../../../models/ProductUnit';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri = 'http://localhost:4000/prodserv';
  test = true;
  constructor(private http: HttpClient) { }
  addProducts(inputMap) {
    return this.http.post(`${this.uri}/add`, inputMap);
  }
  getProducts():Observable<Object> {
    return this.http.get(`${this.uri}/`);
  }
  editProduct(inputMap) {
    // this.http.post(`${this.uri}/edit/${inputMap.productid}`, inputMap).subscribe(res => console.log('Done'));
    return this.http.post(`${this.uri}/edit/${inputMap.productid}`, inputMap);
  }
  deleteProduct(inputMap) {
    var id = inputMap.product
    return this.http.post(`${this.uri}/delete/${id}`, inputMap);
  }
}
