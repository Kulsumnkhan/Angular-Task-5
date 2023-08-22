import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../shared/dataHandler.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  allClients: any;
  authClients: any;
  userId: any;
  leavesDet: any;
  errorMsg: any;

  constructor(private httpServe: DataHandlerService, private route: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.authClients = new FormGroup({
      uName: new FormControl(''),
      pass: new FormControl('')
    })
    // this.login();
    this.httpServe.getClients().subscribe((res: any) => {
      this.allClients = res;
      // console.log(this.allClients);
    })

    this.httpServe.getLeaves().subscribe((res: any) => {
      this.leavesDet = res;
      // console.log(this.allClients);
    })
  }

  login() {
    this.httpServe.isloggedIn = true;
    this.allClients = this.allClients.find((client: any) => {
      return client.uName === this.authClients.value.uName;
    })
    console.log(this.allClients.uName);

    // this.httpServe.getId( this.allClients.id);
    if (this.allClients.uName == this.authClients.value.uName && this.allClients.password == this.authClients.value.pass) {
      console.log('true');
      if (this.allClients.designation === 'hod') {
        console.log('This is HOD dashboard.');
        this.route.navigate(['hod/dashboard', this.allClients.id])
      } else if (this.allClients.designation === 'staff') {
        this.route.navigate(['staff/dashboard', this.allClients.id])
      }
    } else {
      console.log('false');
      this.errorMsg = 'Invalid username and password'
      this.httpServe.getClients().subscribe((res: any) => {
        this.allClients = res;
      })
      this.userId = this.allClients.id;
      console.log(this.allClients.userId);
      this.httpServe.getId(this.userId);
    }
  }
}
