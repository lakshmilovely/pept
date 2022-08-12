import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { environment } from '../../../environments/environment'
import $ from 'jquery';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dateToday = "";
  userProfileId: any;

  clockHandle;
  indexval: number;
  CurrentPage: string;
  moduleData1: any = [];
  moduleData2: any = [];
  usersData: any = [];
  imageUrl = `${environment.apiUrl}`;
  image = this.imageUrl + 'resources/images/';
  id: string;
  response: any;
  Module_Name: any;
  requestData: any = []
  popupdata_Uname: any;
  popupdata_designation: any;
  popupdata_U_EMP_CODE: any;
  popupdata_Location: any;
  popupdata_U_PROFILE_IMAGE: any;
  closeResult: any;
  info: any = [];
  popupdata_U_DOB: string;
  public gfg = true;

  public modules: any = [];
  public submod: any = [];
  SUBMOD = [];

  prev_toggle_row = 0;
  IsPrePrev_Prev = 'N';
  selectedName: any;
  selecttr: any;
  Isinactive: boolean;
  Role_ID: any;
  constructor(private router: Router, private apiSrvc: ApiService) { }

  ngOnInit(): void {

    this.getData();
    this.open();
    this.popup();
  }

  ClickProfile(Id: any) {
    console.log(Id);
    this.router.navigate(['userprofile'])
    this.apiSrvc.setdata(Id);
  }


  clickmods(val: any, item: any) {
    console.log("argsdfewragf", val);
    if (val == 0) {
      this.Isinactive = false
    }
    else {
      this.highlightRow(item);
    }
  }


  open() {
    this.clockHandle = setInterval(() => {
      this.dateToday = new Date().toLocaleString();
    }, 1000);
    this.id = localStorage.getItem('key');
    let obj = {
      "Id": this.id,
      "Expression": ""
    }
    this.apiSrvc.postmethod('users/get', obj).subscribe(res => {
      this.usersData = res.response;
      console.log(this.usersData);
      this.userProfileId = this.usersData[0]

    })
  }
  getData() {
    this.Role_ID = localStorage.getItem('DES_ID')
    console.log(this.Role_ID);

    let Obj = {
      "RoleID": this.Role_ID,
      "expression": "mod_active='Y'"
    }
    this.apiSrvc.postmethod('permissionsbasedonroles/get', Obj).subscribe(res => {
      console.log(res);
      this.modules = res.response;
      console.log('Modules Data 1', this.modules);
      // this.apiSrvc.postmethod('permissionsbasedonroles/get', Obj).subscribe(res => {
      //   this.submod = res.response[1];
      //   console.log('Module Data 2', this.submod);
      // })

    })
  }

  get() {

    console.log('hii')
    const obj = {
      "MOD_SEQ": "0"
    }
    this.apiSrvc.postmethod('module/get', obj).subscribe(res => {
      console.log(res)
      this.response = res
      if (this.response.status == 200) {
        this.moduleData1 = this.response.response;
        console.log(this.moduleData1);
      }
    })


  }

  SubModOpen(Rowno, item) {


    if (this.prev_toggle_row != 0 && this.IsPrePrev_Prev == 'N')
      $("#demo1>tr>td[id='td-" + this.prev_toggle_row + "']").toggle();
    if (this.prev_toggle_row != Rowno) {
      $('#td-' + Rowno).toggle();
      this.IsPrePrev_Prev = 'N';
      this.highlightRow(item);

    }
    else {
      this.IsPrePrev_Prev = 'Y';

      if (this.selectedName != 0) {
        this.selectedName = 0;
        this.Isinactive = false;
      }
      else if (this.selectedName == 0) {
        this.highlightRow(item);
        $('#td-' + Rowno).toggle();
        this.IsPrePrev_Prev = 'N';

      }
    }
    this.prev_toggle_row = Rowno;
  }



  highlightRow(item) {


    this.SUBMOD = []


    this.submod.forEach(e => {
      if (e.MOD_M_ID == item.MOD_ID) {
        this.SUBMOD.push(e)
      }
    })
    console.log(this.SUBMOD);

    this.selecttr = '';
    this.selectedName = item.ROWNUM;
    this.Isinactive = true;
  }

  LogOut() {
    if (localStorage.getItem('check') == 'true') {
      this.router.navigate(['']);
      localStorage.removeItem('key');
      // localStorage.removeItem('username');
      sessionStorage.clear();
      alertify.error('Logged out Successfully');
    } else {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['']);
      alertify.error('Logged out Successfully');
    }

  }


  popup() {
    this.apiSrvc.getdata().subscribe(data => {
      console.log(data);
      this.info = data
      this.popupdata_Uname = this.info.U_NAME;
      this.popupdata_designation = this.info.U_DESIGNATION_NAME;
      this.popupdata_Location = this.info.U_LOC_NAME;
      this.popupdata_U_PROFILE_IMAGE = this.info.U_PROFILE_IMAGE
      this.popupdata_U_EMP_CODE = this.info.U_EMP_CODE
      var todayString: string = new Date(this.info.U_DOJ).toLocaleDateString('en-US').split('T')[0];
      this.popupdata_U_DOB = todayString;
    })

  }



}
