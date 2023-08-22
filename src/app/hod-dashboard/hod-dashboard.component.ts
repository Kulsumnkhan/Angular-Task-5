import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataHandlerService } from '../shared/dataHandler.service';

@Component({
  selector: 'app-hod-dashboard',
  templateUrl: './hod-dashboard.component.html',
  styleUrls: ['./hod-dashboard.component.css']
})

export class HodDashboardComponent implements OnInit {

  list: any;
  currentUsers: any;
  leaves: any;
  approved: any;
  rejected: any;
  uId: any;

  constructor(private activeRoute: ActivatedRoute, private httpServe: DataHandlerService) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.activeRoute.paramMap.subscribe((res: any) => {
      let uid = res.get('id');
      console.log(uid);

      this.httpServe.getClients().subscribe((res: any) => {
        this.list = res;
        console.log(this.list);
        this.list.forEach((uId: any) => {
          if (uId.id == uid) {
            this.currentUsers = uId;
            console.log(this.currentUsers);
          }
        })
        this.getLeaves();
      })
    })
  }

  getLeaves(){
    this.httpServe.getLeaves().subscribe((res: any) => {
      this.leaves = res.filter((user : any) => {
        return user.department === this.currentUsers?.department
      })
      console.log(this.leaves)
    })
  }

  approveRequest(string : any, id : any, eve : any) {
    console.log(eve);
    this.httpServe.approved(string, id).subscribe((res: any) => {
      console.log(res);
      this.httpServe.getLeaves().subscribe((res: any) => {
        this.leaves = res.filter((user: any) => {
          return user.department === this.currentUsers?.department
        })
        console.log(this.leaves);
      })
    })
  }
}
