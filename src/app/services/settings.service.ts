import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  uri = 'http://localhost:4000/settings';
  constructor(private http: HttpClient) { }

  saveSettings(inputMap){
    alert('check2')
    return this.http.post(`${this.uri}/add`, inputMap);
  }
}
