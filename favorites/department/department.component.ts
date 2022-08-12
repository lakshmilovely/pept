import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import * as alertify from 'alertifyjs'


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departmentData: any = [];

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
  locatonid: any;
  departmentid: any;
  DEP_ID: any;
  departmentinsert: any;
  projectdata: any;
  departmentup: any;
  constructor(private apiSrvc: ApiService, public fb: FormBuilder, public rtr: Router, private spinner: NgxSpinnerService) {
    this.gustform = this.fb.group({
      department: ['', Validators.required],
      DEP_ACTIVE: [''],
    });
  }

  ngOnInit(): void {
    this.getdata()
  }

  get f() { return this.gustform.controls; }

  getdata() {
    this.spinner.show();
    this.showGrid = false;
    let obj = {
      "Id": "",
      "Expression": ""
    }
    this.apiSrvc.postmethod('departments/get', obj).subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.showGrid = true;
      this.departmentData = res.response;
      this.departmentData.sort((a: any, b: any) => a.DEP_NAME.localeCompare(b.DEP_NAME));
      console.log('departments', this.departmentData)
    })
  }
  addinsert() {
    console.log("sdfchxblszdbcxjn");

    this.submitted = false;
    this.showAddPanel = true;
    this.showGrid = false;
    this.save1 = true;
    this.save2 = false;

    this.hideall = false;
    this.gustform.reset();
  }
  EditPanel(Id: any) {
    console.log(Id.DEP_NAME);
    this.hideall = true;
    this.save1 = false;
    this.save2 = true;
    this.showAddPanel = true;
    this.showGrid = false;
    this.gustform.controls["department"].setValue(Id.DEP_NAME);
    this.DEP_ID = Id.DEP_ID;
    this.isactive = Id.DEP_ACTIVE == "Y";
    this.isinactive = Id.DEP_ACTIVE == "D";
    if (Id.DEP_ACTIVE == "Y") {
      this.gustform.controls["DEP_ACTIVE"].setValue(Id.DEP_ACTIVE)

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
      "DEP_NAME": this.gustform.value.department,
      "DEP_ACTIVE": "Y",
      "DEP_U_ID": "5"
    }
    this.apiSrvc.postmethod('departments', obj).subscribe(res => {

      this.departmentinsert = res.response;
      console.log(this.departmentinsert);
      alertify.success('Record inserted successfully');
      this.getdata();
    })
    this.showAddPanel = false;
    this.showGrid = true;
    this.display123 = true;
  }
  saveedit() {
    this.submitted = true;
    if (this.gustform.invalid) {
      return false;
    }


    const obj = {
      "DEP_ID": this.DEP_ID,
      "DEP_NAME": this.gustform.value.department,
      "DEP_ACTIVE": this.dummy,
      "DEP_U_ID": 3
    }

    this.apiSrvc.putmethod('departments', obj).subscribe(data => {
      this.getdata();
      this.departmentup = data.response;
      alertify.success('Record updated successfully');
      console.log(this.departmentup)


    });
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
  delete(Id: any) {

    this.departmentid = Id.DEP_ID;
    const obj = {
      "DEP_ID": this.departmentid,
    }
    this.apiSrvc.deletemethod('departments', obj).subscribe(res => {
      console.log(res)
      this.getdata();
      alertify.error('Record deleted successfully');
    })

  }
  Cancel() {
    this.showAddPanel = false;
    this.showGrid = true;
    this.display123 = true;
    this.gustform.reset();
  }
}
