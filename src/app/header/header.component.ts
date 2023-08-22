import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../shared/dataHandler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  show : boolean = true;
  isNewUser : boolean = true;

  constructor( private httpServe : DataHandlerService, private route : Router ){}

  ngOnInit(): void {}

  loggedOut(){
    this.httpServe.loggedOut();
    this.route.navigate(['/login'])
  }
}
