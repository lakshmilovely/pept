import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-ourteam',
  templateUrl: './ourteam.component.html',
  styleUrls: ['./ourteam.component.scss']
})
export class OurteamComponent implements OnInit {

  shotlist: any;
  result: any;
  popupdata: any;
  popuserdata: any;
  ourteam: boolean = true;
  layform: FormGroup;
  U_ID: number;
  popupdata_Uname: any;
  popupdata_designation: any;
  popupdata_Email: any;
  popupdata_U_PHONE_MOBILE: any;
  popupdata_U_Primary_MOBILE: any;
  popupdata_Location: any;
  popupdata_U_PROFILE_IMAGE: any;
  popupEMP_CODE: any;
  popupdata_U_EMP_CODE: any;
  popupdata_U_DOB: string;
  loader: boolean;
  ourteam123: boolean;
  nav123: boolean;

  constructor(public srvc: ApiService, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.getdata();
  }
  displayStyle = "none";
  getdata() {
    this.spinner.show();
    this.ourteam123 = false;
    this.nav123 = false;
    let obj = {
      "Id": "0",
      "Expression": ""
    }
    this.srvc.postmethod('users/get', obj).subscribe(data => {
      this.shotlist = data;

      this.result = this.shotlist.response;
      this.spinner.hide();      
      this.nav123 = true;
      this.ourteam123 = true;
      console.log(this.result);

    });

  }

  onChange(event: any) {

    console.log(event);
  }
  details: any;
  popup(val) {
    this.popupdata_Uname = val.U_NAME;
    this.popupdata_designation = val.U_DESIGNATION_NAME;
    this.popupdata_Location = val.U_LOC_NAME;
    this.popupdata_U_PROFILE_IMAGE = val.U_PROFILE_IMAGE
    this.popupdata_Email = val.U_EMAIL;

    this.popupdata_U_PHONE_MOBILE = val.U_PHONE_MOBILE;
    this.popupdata_U_Primary_MOBILE = val.U_PRIMARY_MOBILE;
    var todayString: string = new Date(val.U_DOJ).toLocaleDateString('en-US').split('T')[0];
    this.popupdata_U_DOB = todayString;

  }
  closePopup() {
    this.displayStyle = "none";
  }

  open(val: any) {
    console.log(val);

    this.srvc.setdata(val)
  }


}



