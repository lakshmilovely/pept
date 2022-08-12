import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-company-employees',
  templateUrl: './company-employees.component.html',
  styleUrls: ['./company-employees.component.scss']
})
export class CompanyEmployeesComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  public headers: any = [
    { id: 'employeeNo', title: 'Employee No', checked: 'true' },
    { id: 'employee firstname', title: 'Employee FirstName', checked: 'true' },
    { id: 'employee lastname', title: 'Employee LastName', checked: 'true' },
    { id: 'bankname', title: 'BankName', checked: 'true' },
    { id: 'bank_accnumber', title: 'Bank Account Number', checked: 'true' },
    { id: 'email', title: 'Email', checked: 'false' },
    { id: 'personalemail', title: 'Personal Email', checked: 'false' },
    { id: 'phone mobile', title: 'Mobile Number', checked: 'false' },
    { id: 'date_of_joining', title: 'Date Of Joining', checked: 'false' },
    { id: 'date_of_birth', title: 'Date Of Birth', checked: 'false' },
    { id: 'fathername', title: 'FatherName', checked: 'false' },
    { id: 'mothername', title: 'MotherName', checked: 'false' },
    { id: 'currentaddress', title: 'Current Address', checked: 'false' },
    { id: 'currentcity', title: 'Current City', checked: 'false' },
    { id: 'currentstate', title: 'Current State', checked: 'false' },
    { id: 'currentcountry', title: 'Current Country', checked: 'false' },
    { id: 'pancard', title: 'Pancard', checked: 'false' },
    { id: 'currentzipcode', title: 'Current Zip Code', checked: 'false' },
    { id: 'drivinglicence', title: 'Driving Lisence', checked: 'false' },
    { id: 'passport', title: 'Passport', checked: 'false' },
    { id: 'voterid', title: 'VoterId', checked: 'false' },
    { id: 'pfnumber', title: 'PF Number', checked: 'false' },
    { id: 'adhaarid', title: 'AdhaarId', checked: 'false' }

  ];

  projectdata: any;
  grid: boolean;
  gustform: FormGroup;
  loader: boolean;
  employeeinfo: any;
  dataArray: any = [];
  firstName: boolean;
  emp: boolean;
  lastName: boolean;
  Email: boolean;
  PERSONAL_EMAIL: boolean;
  PHONE_MOBILE: boolean;
  date_of_joining: boolean;
  date_of_birth: boolean;
  FATHER_NAME: boolean;
  MOTHER_NAME: boolean;
  CURRENT_ADDRESS: boolean;
  CURRENT_CITY: boolean;
  CURRENT_STATE: boolean;
  CURRENT_COUNTRY: boolean;
  CURRENT_ZIP_CODE: boolean;
  PANCARD: boolean;
  PASSPORT: boolean;
  DRIVING_LICENCE: boolean;
  VOTER_ID: boolean;
  ADHAAR_NO: boolean;
  PF_NUMBER: boolean;
  BANK: boolean;
  BANK_ACCOUNT_NUMBER: boolean;
  show: boolean = true;
  excel: boolean;
  submit123: boolean;
  submit233: boolean;
  checkbox: boolean = true;
  checked: any;
  constructor(public srvc: ApiService, public fb: FormBuilder, public rtr: Router,) {
  }
  ngOnInit(): void {
    this.getdata();
    for (let i = 0; i < this.headers.length; i++) {
      if (this.headers[i].checked == 'true') {
        this.dataArray.push(this.headers[i])
      }
    }
  }
  getdata() {
    let obj = {
      "Expression": "",
    }
    this.srvc.postmethod('employeeinfo/get', obj).subscribe(res => {
      console.log(res);
      this.employeeinfo = res.response;
      console.log('Company Holiday', this.employeeinfo)
    })
  }
  onChangeRole(userRole: string, isChecked) {
    console.log('data112355', userRole);
    if (isChecked.target.checked) {
      this.checked = true;
      this.dataArray.push(userRole);
      let el = this.dataArray.find((item => item.id === userRole['id']))
      console.log(el);
      el.checked = "true";
      // for(let i=0;i<this.dataArray.length; i++)
      // {
      //   if(this.dataArray[i].checked == "false")
      //   {
      //     this.dataArray[i].checked = "true"
      //   }
      // }
    } else {
      let el = this.dataArray.find((item => item.id === userRole['id']))
      console.log(el);
      // el.checked = "false";
      if (el) {
        this.dataArray.splice(this.dataArray.indexOf(el), 1)
        console.log(this.dataArray);
        // for(let i=0;i<this.dataArray.length; i++)
        // {
        //   if(this.dataArray[i].checked == "true")
        //   {
        //     this.dataArray[i].checked = "false"
        //   }
        // }
        console.log(this.dataArray);
      }
      // let index = this.dataArray.indexOf(userRole);
      // alert(index)
      // this.dataArray.splice(index, 1);
      // console.log(this.dataArray);
    }
  }

  submit() {
    // if(this.headers.checked == 'false'){
    //   this.grid = false;
    //   this.checkbox = true;
    // }
    console.log(this.dataArray);
    this.emp = false;
    this.firstName = false;
    this.lastName = false;
    this.Email = false;
    this.PERSONAL_EMAIL = false;
    this.PHONE_MOBILE = false;
    this.date_of_joining = false;
    this.date_of_birth = false;
    this.FATHER_NAME = false;
    this.MOTHER_NAME = false;
    this.CURRENT_ADDRESS = false;
    this.CURRENT_CITY = false;
    this.CURRENT_STATE = false;
    this.CURRENT_COUNTRY = false;
    this.CURRENT_ZIP_CODE = false;
    this.PANCARD = false;
    this.DRIVING_LICENCE = false;
    this.PASSPORT = false;
    this.VOTER_ID = false;
    this.PF_NUMBER = false;
    this.ADHAAR_NO = false;
    this.BANK = false;
    this.BANK_ACCOUNT_NUMBER = false;

    for (let i = 0; i < this.dataArray.length; i++) {

      if (this.dataArray[i].id == 'employeeNo' && this.dataArray[i].checked == "true") {
        this.emp = true;
        this.grid = true;
        this.checkbox = false;
      }

      if (this.dataArray[i].id == 'employee firstname' && this.dataArray[i].checked == "true") {
        this.firstName = true;
        this.grid = true;
        this.checkbox = false;
      }

      if (this.dataArray[i].id == 'employee lastname' && this.dataArray[i].checked == "true") {
        this.lastName = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'email' && this.dataArray[i].checked == "true") {
        this.Email = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'personalemail' && this.dataArray[i].checked == "true") {
        this.PERSONAL_EMAIL = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'phone mobile' && this.dataArray[i].checked == "true") {
        this.PHONE_MOBILE = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'date_of_joining' && this.dataArray[i].checked == "true") {
        this.date_of_joining = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'date_of_birth' && this.dataArray[i].checked == "true") {
        this.date_of_birth = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'fathername' && this.dataArray[i].checked == "true") {
        this.FATHER_NAME = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'mothername' && this.dataArray[i].checked == "true") {
        this.MOTHER_NAME = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'currentaddress' && this.dataArray[i].checked == "true") {
        this.CURRENT_ADDRESS = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'currentcity' && this.dataArray[i].checked == "true") {
        this.CURRENT_CITY = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'currentstate' && this.dataArray[i].checked == "true") {
        this.CURRENT_STATE = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'currentcountry' && this.dataArray[i].checked == "true") {
        this.CURRENT_COUNTRY = true;
        this.grid = true;
        this.checkbox = false;
      }

      if (this.dataArray[i].id == 'currentzipcode' && this.dataArray[i].checked == "true") {
        this.CURRENT_ZIP_CODE = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'pancard' && this.dataArray[i].checked == "true") {
        this.PANCARD = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'drivinglicence' && this.dataArray[i].checked == "true") {
        this.DRIVING_LICENCE = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'passport' && this.dataArray[i].checked == "true") {
        this.PASSPORT = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'voterid' && this.dataArray[i].checked == "true") {
        this.VOTER_ID = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'pfnumber' && this.dataArray[i].checked == "true") {
        this.PF_NUMBER = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'adhaarid' && this.dataArray[i].checked == "true") {
        this.ADHAAR_NO = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'bankname' && this.dataArray[i].checked == "true") {
        this.BANK = true;
        this.grid = true;
        this.checkbox = false;
      }
      if (this.dataArray[i].id == 'bank_accnumber' && this.dataArray[i].checked == "true") {
        this.BANK_ACCOUNT_NUMBER = true;
        this.grid = true;
        this.checkbox = false;

      }

      // if (this.dataArray[i].checked == "false") {
      // alert("select a checkbox to continue")
      //   this.grid = false;
      //   this.checkbox = true;
      // }

    }
    if (this.dataArray == '' || this.dataArray == undefined) {
      alert("select a checkbox to continue")
      this.grid = false;
      this.checkbox = true;
    }
    else {
      this.excel = true;
      return;
    }

  }

  ExportToExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById("content"));

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'employeedetails.xlsx');
    this.submit123 = true;
    this.submit233 = false;
  }

  Cancel() {
    console.log(this.headers);
    for (let i = 0; i < this.headers.length; i++) {
        this.headers[i].checked = "false"      
    }
    this.dataArray = []
    this.grid = false;
    this.show = true;
    // this.checkboxes.forEach((element) => {
    //   element.nativeElement.checked = false;
    //   this.dataArray.length = 0;
    // });
    this.checkbox = true;
  }

}
