import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(private growl: MessageService, public router: Router) { }

  ngOnInit() {
  }

  loginActionPerformed() {
    var username = this.loginForm.get('username').value;
    var password = this.loginForm.get('password').value;
    if (username === 'a') {
      if (password === 'a') {
        console.log("success");
        this.router.navigate(['dashboard']);
        console.log("session "+sessionStorage.getItem('jsessionid'));
      } else {
        this.growl.add({ key: 'loginTaost', closable: true, life: 100000000, severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
      }
    }
  }
}
