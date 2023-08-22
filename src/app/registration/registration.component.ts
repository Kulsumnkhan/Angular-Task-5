import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataHandlerService } from '../shared/dataHandler.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit{

  staffDetails : any;

  constructor( private fb : FormBuilder, private httpServe : DataHandlerService ){}

  ngOnInit(): void {
    this.staffDetails = this.fb.group({
      designation : this.fb.control('', Validators.required),
      title : this.fb.control('', Validators.required),
      fName : this.fb.control('', Validators.required),
      lName : this.fb.control('', Validators.required),
      email : this.fb.control('', Validators.required),
      contact : this.fb.control('', Validators.required),
      department : this.fb.control('', Validators.required),
      uName : this.fb.control('', Validators.required),
      password : this.fb.control('', Validators.required)
    })
  }

  onSubmit(){
    console.log(this.staffDetails.value);
    this.httpServe.postClients(this.staffDetails.value).subscribe(( res : any ) => {
      // console.log(res);
      alert('Registration complete.')
      this.staffDetails.reset();
    })
  }
}
