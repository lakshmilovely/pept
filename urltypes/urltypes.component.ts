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
  selector: 'app-urltypes',
  templateUrl: './urltypes.component.html',
  styleUrls: ['./urltypes.component.scss'],
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
export class UrltypesComponent implements OnInit {
  projectdata: any;
  showAddPanel: boolean = false;
  showGrid: boolean = true;
  save1: boolean = false;
  save2: boolean = false;
  gustform: FormGroup;
  submitted: boolean;
  projectinsert: any;
  PUT_ID: any;
  display123: boolean = true;
  hideall: boolean;
  isactive: boolean;
  isinactive: boolean;
  dummy: string;
  constructor(public srvc: ApiService, public fb: FormBuilder, public rtr: Router, private spinner: NgxSpinnerService) {
    this.gustform = this.fb.group({
      urltypes: ['', Validators.required],
      PUT_ACTIVE: [''],
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
    this.srvc.postmethod('urlypes/get', obj).subscribe(res => {

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
    this.gustform.reset();
    this.hideall = false;
    this.display123 = false;
  }
  EditPanel(Id) {
    console.log(Id);
    this.gustform.controls["urltypes"].setValue(Id.PUT_NAME);
    this.PUT_ID = Id.PUT_ID;
    this.showAddPanel = true;
    this.showGrid = false;
    this.save1 = false;
    this.save2 = true;
    this.display123 = false;
    this.hideall = true;
    this.isactive = Id.PUT_ACTIVE == "Y";
    this.isinactive = Id.PUT_ACTIVE == "D";
    if (Id.PUT_ACTIVE == "Y") {
      this.gustform.controls["PUT_ACTIVE"].setValue(Id.PUT_ACTIVE)

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
      "PUT_NAME": this.gustform.value.urltypes,
      "PUT_ACTIVE": "Y",
      "PUT_U_ID": 1,
    }
    this.srvc.postmethod('urlypes', obj).subscribe(res => {
      console.log(res)
      this.projectinsert = res.response;
      console.log(this.projectinsert);
      alertify.success('Record inserted successfully');
      this.getdata();
    })
    this.showAddPanel = false;
    this.showGrid = true;
    this.display123 = true;


  }
  get f() { return this.gustform.controls; }
  saveedit() {
    this.submitted = true;
    if (this.gustform.invalid) {
      return false;
    }


    const obj = {
      "PUT_ID": this.PUT_ID,
      "PUT_NAME": this.gustform.value.urltypes,
      "PUT_ACTIVE": this.dummy,
      "PUT_U_ID": 1,
    }

    this.srvc.putmethod('urlypes', obj).subscribe(data => {
      console.log(data)
      alertify.success('Record updated successfully');
      this.getdata();
    });
    this.showAddPanel = false;
    this.showGrid = true;
    this.display123 = true;

  }
  delete(id: any) {
    this.PUT_ID = id.PUT_ID;
    const obj = {
      "PUT_ID": this.PUT_ID,
    }
    this.srvc.deletemethod('urlypes', obj).subscribe(res => {
      console.log(res)
      alertify.error('Record inactived successfully');
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
    this.showGrid = true;
    this.showAddPanel = false;
  }
}
