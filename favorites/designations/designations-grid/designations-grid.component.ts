import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-designations-grid',
  templateUrl: './designations-grid.component.html',
  styleUrls: ['./designations-grid.component.scss']
})
export class DesignationsGridComponent implements OnInit {

  DesignationsData: any = [];
  search: any = "";
  showAddPanel: boolean = false;
  showGrid: boolean = true;
  save1: boolean = false;
  save2: boolean = false;
  gustform: FormGroup;
  submitted: boolean;
  display123: boolean = true;
  hideall: boolean;
  isactive: boolean;
  isinactive: boolean;
  isstatus: boolean;
  dummy: string;
  DES_ID: any;
  projectinsert: any;

  constructor(public srvc: ApiService, public fb: FormBuilder, public router: Router, private spinner: NgxSpinnerService) {
    this.gustform = this.fb.group({
      designationname: ['', Validators.required],
      DES_ACTIVE: [''],
    });
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.spinner.show();
    let obj = {
      "Id": "",
      "Expression": ""
    }
    this.srvc.postmethod('designations/get', obj).subscribe((res: any) => {
      this.DesignationsData = res.response;
      this.DesignationsData.sort((a: any, b: any) => a.DES_NAME.localeCompare(b.DES_NAME));
      this.spinner.hide();
      this.showGrid = true;
      console.log("Designations", this.DesignationsData);
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
  editdesignation(Id) {
    console.log(Id);
    this.gustform.controls["designationname"].setValue(Id.DES_NAME);
    this.DES_ID = Id.DES_ID;
    this.showAddPanel = true;
    this.showGrid = false;
    this.save1 = false;
    this.display123 = false;
    this.save2 = true;
    this.hideall = true;
    this.isactive = Id.DES_ACTIVE == "Y";
    this.isinactive = Id.DES_ACTIVE == "D";
    if (Id.DES_ACTIVE == "Y") {
      this.gustform.controls["DES_ACTIVE"].setValue(Id.DES_ACTIVE)
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
      "DES_NAME": this.gustform.value.designationname,
      "DES_ACTIVE": "Y",
      "DES_U_ID": "5"
    }
    this.srvc.postmethod('designations', obj).subscribe(res => {
      console.log(res)
      this.projectinsert = res.response;
      console.log(this.projectinsert);
      alertify.success('Designation added successfully')
      this.getData();
    })
    this.showAddPanel = false;
    this.display123 = true;
    this.showGrid = true;
    this.gustform.reset();
  }
  get f() { return this.gustform.controls; }

  saveedit() {
    this.submitted = true;
    if (this.gustform.invalid) {
      return false;
    }
    const obj = {
      "DES_ID": this.DES_ID,
      "DES_NAME": this.gustform.value.designationname,
      "DES_ACTIVE": this.dummy,
      "DES_U_ID": "5"
    }

    this.srvc.putmethod('designations', obj).subscribe(data => {
      console.log(data);
      alertify.success('Designation updated successfully')
      this.getData();
    });
    this.showAddPanel = false;
    this.display123 = true;
  }

  EditPanel(Object) {
    console.log(Object);
    this.router.navigate(['designations-edit']);
    this.srvc.setdata(Object.DES_ID)
  }
  delete(id: any) {
    if (window.confirm('are you sure to delete this record?')) {
      this.DES_ID = id.DES_ID;
      const obj = {
        "DES_ID": this.DES_ID,
      }
      this.srvc.deletemethod('designations', obj).subscribe(res => {
        console.log(res)
        alertify.error('Designation deleted successfully')
        this.getData();
      })
    }

  }
  Cancel() {
    this.showAddPanel = false;
    this.showGrid = true;
    this.display123 = true;
    this.gustform.reset();
  }

  viewall() {
    this.showAddPanel = false;
    this.showGrid = true;
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
