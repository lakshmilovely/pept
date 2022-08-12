import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
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
export class LocationsComponent implements OnInit {
  layform: FormGroup;
  locationsData: any = [];
  showGrid: boolean;
  showAddPanel: boolean = false;
  showEditPanel: boolean = false;
  locationsinsert: any;
  submitted = false;
  LOC_U_ID: any;
  save1: boolean = false;
  save2: boolean = false;
  dummy: any;
  LOC_ID: any;
  locatonid: any;
  display123: boolean = true;
  hideall: boolean;
  isactive: boolean;
  isinactive: boolean;
  constructor(public fb: FormBuilder, private apiSrvc: ApiService, public rtr: Router, private spinner: NgxSpinnerService) {
    this.layform = this.fb.group({
      LocationName: ['', Validators.required],
      addressline1: ['', Validators.required],
      addressline2: [''],
      addressline3: [''],
      addressline4: [''],
      addressline5: [''],
      Locationdes: [''],
      LOC_ACTIVE: [''],
    });

  }

  ngOnInit(): void {

    this.getdata();
  }
  // totaldatageting
  getdata() {
    this.spinner.show();
    this.showGrid = false;
    let obj = {
      "Id": "",
      "Expression": ""
    }
    this.apiSrvc.postmethod('locations/get', obj).subscribe(res => {
      
      this.spinner.hide();
      this.showGrid = true;
      this.locationsData = res.response;
      this.locationsData.sort((a: any, b: any) => a.LOC_NAME.localeCompare(b.LOC_NAME));
    })
  }
  // addform
  AddPanel() {
    this.submitted = false;
    this.showGrid = false;
    this.showAddPanel = true;
    this.save1 = true;
    this.save2 = false;
    this.hideall = false;
    this.layform.reset();
    this.display123 = false;
  }
  // editform
  EditPanel(Id: any) {
    this.layform.controls["LocationName"].setValue(Id.LOC_NAME)
    this.layform.controls["addressline1"].setValue(Id.LOC_LINE1)
    this.layform.controls["addressline2"].setValue(Id.LOC_LINE2)
    this.layform.controls["addressline3"].setValue(Id.LOC_LINE3)
    this.layform.controls["addressline4"].setValue(Id.LOC_LINE4)
    this.layform.controls["addressline5"].setValue(Id.LOC_LINE5)
    this.layform.controls["Locationdes"].setValue(Id.LOC_DESC)
    this.LOC_ID = Id.LOC_ID;
    console.log(Id)
    this.showAddPanel = true;
    this.showGrid = false;
    this.save1 = false;
    this.save2 = true;
    this.display123 = false;
    this.hideall = true;
    this.isactive = Id.LOC_ACTIVE == "Y";
    this.isinactive = Id.LOC_ACTIVE == "D";
    if (Id.LOC_ACTIVE == "Y") {
      this.layform.controls["LOC_ACTIVE"].setValue(Id.LOC_ACTIVE)

    }
    if (this.isactive == true) {
      this.dummy = 'Y'
    }
    if (this.isinactive == true) {
      this.dummy = 'D'
    }
  }

  // adding
  insert() {
    console.log('hih');
    this.submitted = true;
    if (this.layform.invalid) {
      return false;
    }
    let LocationName = this.layform.value.LocationName;
    let addressline1 = this.layform.value.addressline1;
    let addressline2 = this.layform.value.addressline2;
    let addressline3 = this.layform.value.addressline3;
    let addressline4 = this.layform.value.addressline4;
    let addressline5 = this.layform.value.addressline5;
    let Locationdes = this.layform.value.Locationdes;

    const obj = {
      "LOC_NAME": LocationName,
      "LOC_LINE1": addressline1,
      "LOC_LINE2": addressline2,
      "LOC_LINE3": addressline3,
      "LOC_LINE4": addressline4,
      "LOC_LINE5": addressline5,
      "LOC_DESC": Locationdes,
      "LOC_ACTIVE": "Y",
      "LOC_U_ID": 5,
    }

    this.apiSrvc.postmethod('locations', obj).subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        alertify.success("Record inserted successfully");
        this.getdata();
        this.showAddPanel = false;
        this.showGrid = true;
        this.display123 = true;
      }
      else if (res.status == 401) {
        alertify.error(res.error)
      }
    })
 
  }
  // editing
  get f() { return this.layform.controls; }
  saveedit() {
    this.submitted = true;
    if (this.layform.invalid) {
      return false;
    }
    let LocationName = this.layform.value.LocationName;
    let addressline1 = this.layform.value.addressline1;
    let addressline2 = this.layform.value.addressline2;
    let addressline3 = this.layform.value.addressline3;
    let addressline4 = this.layform.value.addressline4;
    let addressline5 = this.layform.value.addressline5;
    let Locationdes = this.layform.value.Locationdes;

    const obj = {
      "LOC_ID": this.LOC_ID,
      "LOC_NAME": LocationName,
      "LOC_LINE1": addressline1,
      "LOC_LINE2": addressline2,
      "LOC_LINE3": addressline3,
      "LOC_LINE4": addressline4,
      "LOC_LINE5": addressline5,
      "LOC_DESC": Locationdes,
      "LOC_ACTIVE": this.dummy,
      "LOC_U_ID": 5,
    }

    this.apiSrvc.putmethod('locations', obj).subscribe(data => {
      console.log(data)
      alertify.success("Record updated successfully");
      this.getdata();
    });

    this.showAddPanel = false;
    this.showGrid = true;
    this.display123 = true;
  }

  //  deletingdata
  delete(Id: any) {

    this.locatonid = Id.LOC_ID;
    const obj = {
      "LOC_ID": this.locatonid,
    }
    this.apiSrvc.deletemethod('locations', obj).subscribe(res => {
      console.log(res)
      alertify.error("Record deleted successfully");
      this.getdata();

    })

  }
  // cancle
  Cancel() {
    this.showAddPanel = false;
    this.showGrid = true;
    this.display123 = true;
    this.layform.reset();
  }
  viewall() {
    this.showGrid = true;
    this.showAddPanel = false;
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
}

