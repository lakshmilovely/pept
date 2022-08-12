import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import * as alertify from 'alertifyjs'
@Component({
  selector: 'app-company-holidays',
  templateUrl: './company-holidays.component.html',
  styleUrls: ['./company-holidays.component.scss']
})
export class CompanyHolidaysComponent implements OnInit {

  HolidaysForm: FormGroup;
  companyHolidayData: any = [];
  showGrid: boolean = true;
  showAddPanel: boolean = false;
  showEditPanel: boolean = false;
  AddHoliday: any;
  submitted = false;
  CH_ID: any;
  save1: boolean = false;
  save2: boolean = false;
  CH_U_ID: any;
  arrayData: any = [];
  HolidaysData: any;
  [x: string]: any;
  DEL_CH_ID: any;
  IndiaGrid: boolean = true;
  USAGrid: boolean = false;
  display: boolean = true;
  val: any
  selectCountry: any = [];
  locData: any = [];

  SelectedId= 1003;

  // selectCountry: any = [
  //   { id: '9', name: 'INDIA' },
  //   { id: '1', name: 'USA' }
  // ]
  constructor(private apiSrvc: ApiService, private fB: FormBuilder, private router: Router) {
    this.HolidaysForm = this.fB.group({
      holidayname: ['', [Validators.required]],
      date: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.Grid(1003);
    this.getLocations();
  }
  Grid(value) {
    console.log(value);
    
    let obj = {
      "Id": "",
      "Expression": "",
    }
    this.apiSrvc.postmethod('companyholidays/get', obj).subscribe(arrayData => {
      console.log(arrayData);
      this.companyHolidayData = arrayData.response;
      this.companyHolidayData.sort((a:any,b:any)=>{
        const dt1 = Date.parse(a.CH_DATE);
        const dt2 = Date.parse(b.CH_DATE);
        if (dt1 < dt2) return 1;
        if (dt1 > dt2) return -1;
        return 0;})
      console.log('Company Holiday', this.companyHolidayData)
      this.selectCountry
      if(value == "" || value == undefined){
        this.SelectedId = 1003
      }else{
      this.onChange(value)
    }
    })
  }

  getLocations() {    
    let obj = {
      "Id": ""
    }
    this.apiSrvc.postmethod('locations/get', obj).subscribe((res: any) => {
      this.selectCountry = res.response
      this.selectCountry.forEach(el => {
        if (el.LOC_ACTIVE == 'Y') {
          this.locData.push(el);
        }
      });
      
    })

  }




  onChange(value) {
    console.log(value);
    
    this.arrayData = []
    console.log(this.companyHolidayData)
    this.companyHolidayData.forEach(res => {
      if (res.CH_LOC_ID == value) {
        this.arrayData.push(res)
      }
    })
    if (value == 1003) {
      this.IndiaGrid = true;
      this.USAGrid = false;
    } if (value == 1001) {
      this.IndiaGrid = false;
      this.USAGrid = true;
    }
  }



  AddPanel() {
    this.submitted = false;
    this.showGrid = false;
    this.showAddPanel = true;
    this.save1 = true;
    this.save2 = false;
    this.HolidaysForm.reset();
    this.display = false;

    setTimeout(() => {
      var today = new Date().toISOString().split('T')[0];
      var dt = new Date(today)
      dt.setMonth(dt.getMonth())
      this.Today = dt.toISOString().split('T')[0]
      console.log("date", this.Today);
      document.getElementsByName('date')[0].setAttribute('min', this.Today)
    })
  }

  EditPanel(Id: any) {
    console.log(Id);
    this.HolidaysForm.controls["holidayname"].setValue(Id.CH_TITLE)
    this.HolidaysForm.controls["date"].setValue(formatDate(Id.CH_DATE, 'yyyy-MM-dd', 'en'));
    console.log(Id.CH_DATE);

    this.HolidaysForm.controls["type"].setValue(Id.CH_HOLIDAY_TYPE)
    this.HolidaysForm.controls["location"].setValue(Id.CH_LOC_ID)
    this.CH_ID = Id.CH_ID;

    this.showAddPanel = true;
    this.showGrid = false;
    this.save1 = false;
    this.save2 = true;
    this.display = false;

    /*  HIDE PAST DATE */
    setTimeout(() => {
      var today = new Date().toISOString().split('T')[0];
      var dt = new Date(today)
      dt.setMonth(dt.getMonth())
      this.Today = dt.toISOString().split('T')[0]
      console.log("date", this.Today);
      document.getElementsByName('date')[0].setAttribute('min', this.Today)
    })


  }



  insert() {
    console.log("form submission");
    this.submitted = true;
    if (this.HolidaysForm.invalid) {
      return false;
    }
    let holidayname = this.HolidaysForm.value.holidayname;
    let date = this.HolidaysForm.value.date;
    let type = this.HolidaysForm.value.type;
    let location = this.HolidaysForm.value.location;


    const obj = {
      "CH_DATE": date,
      "CH_TITLE": holidayname,
      "CH_HOLIDAY_TYPE": type,
      "CH_ACTIVE": "Y",
      "CH_LOC_ID": location,
      "CH_U_ID": 5
    }
    this.apiSrvc.postmethod('companyholidays', obj).subscribe(res => {

      this.AddHoliday = res.response;
      console.log(this.AddHoliday);
      alertify.success("Added Successfully")
      this.Grid(location);
    })
    this.showAddPanel = false;
    this.showGrid = true;
    this.display = true;

  }

  get f() { return this.HolidaysForm.controls; }

  saveedit() {
    this.submitted = true;
 
    if (this.HolidaysForm.invalid) {
      return false;
    }
    let holidayname = this.HolidaysForm.value.holidayname;
    let date = this.HolidaysForm.value.date;
    let type = this.HolidaysForm.value.type;
    let location = this.HolidaysForm.value.location;


    const obj = {
      "CH_ID": this.CH_ID,
      "CH_TITLE": holidayname,
      "CH_DATE": date,
      "CH_HOLIDAY_TYPE": type,
      "CH_LOC_ID": location,
      "CH_ACTIVE": "Y",
      "CH_U_ID": 5,
    }

    this.apiSrvc.putmethod('companyholidays', obj).subscribe(data => {
      console.log(data)
      alertify.success("Record updated successfully")
      this.Grid(location);
      console.log(location);
      
    });
    this.showAddPanel = false;
    this.showGrid = true;
    this.display = true;
    this.HolidaysForm.reset()
  }
  delete(Id: any) {
    this.DEL_CH_ID = Id.CH_ID;
    const obj = {
      "CH_ID": this.DEL_CH_ID,
    }
    if (window.confirm(' Are you sure, You want to delete this?'))
      this.apiSrvc.deletemethod('companyholidays', obj).subscribe(res => {
        console.log(res)
        alertify.error("Deleted Successfully");
       this.SelectedId = Id.CH_LOC_ID;
       if (Id.CH_LOC_ID == 1001) {
        this.IndiaGrid = false;
        this.USAGrid = true;
      }
        this.Grid(Id.CH_LOC_ID);
      })

  }
  Cancel() {
    this.showAddPanel = false;
    this.showEditPanel = false;
    this.showGrid = true;
    this.HolidaysForm.reset()
  }
  viewall() {
    this.showGrid = true;
    this.showAddPanel = false;
  }

}
