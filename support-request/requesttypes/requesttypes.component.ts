import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import {

  trigger,

  state,

  style,

  animate,

  transition

} from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-requesttypes',
  templateUrl: './requesttypes.component.html',
  styleUrls: ['./requesttypes.component.scss'],
  animations: [

    trigger('fadeInOut', [

      state('in', style({ opacity: 1, transform: 'translateY(0)' })),

      transition('void => *', [

        style({ opacity: 0, transform: 'translateY(100%)' }),

        animate(800)

      ]),

      transition('* => void', [

        animate(800, style({ opacity: 0, transform: 'translateY(100%)' }))

      ])

    ])

  ]
})
export class RequesttypesComponent implements OnInit {

  projectdata: any;
  showAddPanel: boolean = false;
  showGrid: boolean = true;
  save1: boolean = false;
  save2: boolean = false;
  gustform: FormGroup;
  submitted: boolean;
  projectinsert: any;
  RT_ID: any;
  display123: boolean = true;
  hideall: boolean;
  isactive: boolean;
  isinactive: boolean;
  dummy: string;
  constructor(public srvc: ApiService, public fb: FormBuilder, public rtr: Router, private spinner: NgxSpinnerService) {
    this.gustform = this.fb.group({
      requesttype: ['', Validators.required],
      RT_ACTIVE: [''],
    });
  }

  ngOnInit(): void {
    this.getdata();
  }
  getdata() {
    this.spinner.show();
    this.showGrid = false;
    let obj = {
      "Id": "",
      "Expression": ""
    }
    this.srvc.postmethod('requesttype/get', obj).subscribe(res => {

      this.projectdata = res.response;
      this.spinner.hide();
      this.showGrid = true;
      console.log(this.projectdata);
    })
  }
  addinsert() {
    this.submitted = false;
    this.showAddPanel = true;
    this.showGrid = false;
    this.save1 = true;
    this.save2 = false;
    this.display123 = false;
    this.hideall = false;
    this.gustform.reset();
  }
  EditPanel(Id) {
    console.log(Id);
    this.gustform.controls["requesttype"].setValue(Id.RT_NAME);
    this.RT_ID = Id.RT_ID;
    this.showAddPanel = true;
    this.showGrid = false;
    this.save1 = false;
    this.save2 = true;
    this.display123 = false;
    this.hideall = true;
    this.isactive = Id.RT_ACTIVE == "Y";
    this.isinactive = Id.RT_ACTIVE == "D";
    if (Id.RT_ACTIVE == "Y") {
      this.gustform.controls["RT_ACTIVE"].setValue(Id.RT_ACTIVE)

    }
    if (this.isactive == true) {
      this.dummy = 'Y'
    }
    if (this.isinactive == true) {
      this.dummy = 'D'
    }

  }
  insert() {
    this.submitted = true;
    if (this.gustform.invalid) {
      return false;
    }
    const obj = {
      "RT_NAME": this.gustform.value.requesttype,
      "RT_ACTIVE": "Y",
      "RT_U_ID": 2,
    }
    this.srvc.postmethod('requesttype', obj).subscribe(res => {
      console.log(res)
      this.projectinsert = res.response;
      console.log(this.projectinsert);
      alertify.success('Record inserted successfully')
      this.getdata();
    })
    this.showAddPanel = false;
    this.display123 = true;


  }
  get f() { return this.gustform.controls; }
  saveedit() {
    this.submitted = true;
    if (this.gustform.invalid) {
      return false;
    }


    const obj = {
      "RT_ID": this.RT_ID,
      "RT_NAME": this.gustform.value.requesttype,
      "RT_ACTIVE": this.dummy,
      "RT_U_ID": 2,
    }

    this.srvc.putmethod('requesttype', obj).subscribe(data => {
      console.log(data)
      alertify.success('Record updated successfully');
      this.getdata();
    });
    this.showAddPanel = false;
    this.display123 = true;
    this.gustform.reset();
  }
  delete(id: any) {
    this.RT_ID = id.RT_ID;
    const obj = {
      "RT_ID": this.RT_ID,
    }
    this.srvc.deletemethod('requesttype', obj).subscribe(res => {
      console.log(res)
      alertify.error('Record deleted successfully');
      this.getdata();
    })

  }
  Cancel() {
    this.showAddPanel = false;
    this.showGrid = true;
    this.display123 = true;
    this.gustform.reset();

  }
  status(val) {

    if (val == true) {
      this.dummy = "Y";
      this.isactive = true;
      this.isinactive = false;
    }
    else {
      this.dummy = "D";
      this.isactive = false;
      this.isinactive = true;
    }

  }

  viewall() {
    this.showAddPanel = false;
    this.showGrid = true;
  }
}
