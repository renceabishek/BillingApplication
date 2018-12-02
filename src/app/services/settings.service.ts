import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  uri = 'http://localhost:4000/settings';
  constructor(private http: HttpClient) { }

  getSettings():Observable<Object> {
    return this.http.get(`${this.uri}/`);
  }

  saveSettings(inputMap){
    return this.http.post(`${this.uri}/add`, inputMap);
  }

  editSettings(inputMap) {
    return this.http.post(`${this.uri}/edit/${inputMap._id}`, inputMap);
  }
}
