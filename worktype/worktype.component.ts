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
  selector: 'app-worktype',
  templateUrl: './worktype.component.html',
  styleUrls: ['./worktype.component.scss'],
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
export class WorktypeComponent implements OnInit {
  projectdata: any;
  showAddPanel: boolean = false;
  showGrid: boolean;
  save1: boolean = false;
  save2: boolean = false;
  gustform: FormGroup;
  PWT_ID: any;
  submitted: boolean;
  projectinsert: any;
  display123: boolean = true;
  hideall: boolean;
  isactive: boolean;
  isstatus: boolean;
  isinactive: boolean;
  dummy: any;

  constructor(public srvc: ApiService, public fb: FormBuilder, public rtr: Router, private spinner: NgxSpinnerService) {
    this.gustform = this.fb.group({
      worktypepro: ['', Validators.required],
      PWT_ACTIVE: ['']
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
    this.srvc.postmethod('projectworktype/get', obj).subscribe(res => {

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
    this.display123 = false;
    this.hideall = false;
  }
  EditPanel(Id) {
    console.log(Id);
    this.gustform.controls["worktypepro"].setValue(Id.PWT_NAME);
    this.PWT_ID = Id.PWT_ID;
    this.showAddPanel = true;
    this.showGrid = false;
    this.save1 = false;
    this.save2 = true;
    this.display123 = false;
    this.hideall = true;
    this.isactive = Id.PWT_ACTIVE == "Y";
    this.isinactive = Id.PWT_ACTIVE == "D";
    if (Id.PWT_ACTIVE == "Y") {
      this.gustform.controls["PWT_ACTIVE"].setValue(Id.PWT_ACTIVE)

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
      "PWT_NAME": this.gustform.value.worktypepro,
      "PWT_ACTIVE": "Y",
      "PWT_U_ID": 4,
    }
    this.srvc.postmethod('projectworktype', obj).subscribe(res => {
      console.log(res)
      this.projectinsert = res.response;
      console.log(this.projectinsert);
      alertify.success('Record inserted successfully');
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
      "PWT_ID": this.PWT_ID,
      "PWT_NAME": this.gustform.value.worktypepro,
      "PWT_ACTIVE": this.dummy,
      "PWT_U_ID": "4"
    }
    this.srvc.putmethod('projectworktype', obj).subscribe(data => {
      console.log(data);
      alertify.success('Record updated successfully');
      this.getdata();
    });

    this.showAddPanel = false;
    this.display123 = true;
    this.gustform.reset();
  }
  delete(id: any) {
    this.PWT_ID = id.PWT_ID;
    const obj = {
      "PWT_ID": this.PWT_ID,
    }
    this.srvc.deletemethod('projectworktype', obj).subscribe(res => {
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
    this.showGrid = true;
    this.showAddPanel = false;
  }
}
