import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataHandlerService } from '../shared/dataHandler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})

export class StaffDashboardComponent implements OnInit {

  leaveDetails: any;
  currentUsers: any;
  allClients: any;
  leaves: any;
  totalNoOfDays: any;
  userID: any;
  list: any;
  uId: any;
  totalLeaves: any;
  uid: any;
  approvedLeaves: any = 0;
  pendingLeaves: any = 0;
  rejectedLeaves: any = 0;

  constructor(private fb: FormBuilder, private httpServe: DataHandlerService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.leaveDetails = this.fb.group({
      startdt: this.fb.control('', Validators.required),
      enddt: this.fb.control('', Validators.required),
      reason: this.fb.control('', Validators.required)
    })
    this.getUsersList();
  }

  onSubmit() {
    this.userID = this.httpServe.uId;
    console.log(this.userID);
    console.log(this.leaveDetails.value);
    console.log(this.leaveDetails.value.startdt);
    console.log(this.leaveDetails.value.enddt);
    let date1 = new Date(this.leaveDetails.value.startdt)
    let date2 = new Date(this.leaveDetails.value.enddt)
    let noOfDays = date2.getTime() - date1.getTime();
    this.totalNoOfDays = noOfDays / (1000 * 3600 * 24)
    console.log(this.totalNoOfDays);

      let newObj = {
        designation: this.currentUsers.designation,
        title: this.currentUsers.title,
        fName: this.currentUsers.fName,
        lName: this.currentUsers.lName,
        department: this.currentUsers.department,
        lid : this.currentUsers.id,
        startdt: this.leaveDetails.value.startdt,
        enddt: this.leaveDetails.value.enddt,
        totalNoOfDays: this.totalNoOfDays,
        reason : this.leaveDetails.value.reason,
        status : 'Pending'
      }
      console.log(newObj);
      this.httpServe.postLeave(newObj).subscribe(( res : any ) => {
        console.log(res);
        this.approvedLeaves = 0;
        this.pendingLeaves = 0;
        this.rejectedLeaves = 0;
        this.getUsersList();
      })
      this.leaveDetails.reset();
  }

  getUsersList() {
    this.activeRoute.paramMap.subscribe((res: any) => {
      this.uid = res.get('id');
      console.log(this.uid);

      this.httpServe.getClients().subscribe((res: any) => {
        this.list = res;
        console.log(this.list);
        this.list.forEach((uId: any) => {
          if (uId.id == this.uid) {
            this.currentUsers = uId;
            console.log(this.currentUsers);
          }
        })
        this.httpServe.getLeaves().subscribe(( res : any ) => {
          this.leaves = res.filter(( user : any ) => {
            console.log(user.department === this.currentUsers?.department);
            console.log(user.lid, this.uid);
            return user.department === this.currentUsers?.department && user.lid === this.uid;
          })
          console.log(this.leaves.length);
          this.calculateLeaves()
        })
      })
    })
  }
  calculateLeaves(){
    this.totalLeaves = this.leaves.length;
    this.leaves.forEach(( client : any ) => {
      if( client.status == 'Approved' ){
        this.approvedLeaves++
      } else if ( client.status == 'Pending' ){
        this.pendingLeaves++
      } else if ( client.status == 'Rejected' ){
        this.rejectedLeaves++
      }
    })
  }
}