import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';

@Component({
  selector: 'app-support-request',
  templateUrl: './support-request.component.html',
  styleUrls: ['./support-request.component.scss']
})
export class SupportRequestComponent implements OnInit {


  SupportRequestsData: any = [];
  SupportRequestsType: any = [];
  RequestSRT: any =[];
  SRT_DATA: any = [];

  
  SR_Count: any = []
  SupportRequestById: any = [];
  result = "No Records Found"
  showGrid: boolean = false;
  showPanel: boolean = false;
  showGridDetails: boolean = true;
  showAddPanel: boolean = false;
  showError: boolean = true;
  RequestStatusData: any = [];
  requestData: any = []

  constructor(private apiSrvc: ApiService) { }

  ngOnInit(): void {
    let obj = {
      "expression": "AssignedTo ='Support Team'",
      "u_id": "",
      "r_id": "0",
      "cnt": "0",
      "sortby": "null"
    }
    this.apiSrvc.postmethod('supportrequestdetails/get', obj).subscribe(res => {
      this.SupportRequestsData = res.response[0];
      console.log('Support Requests', this.SupportRequestsData)
    })

    this.apiSrvc.postmethod('supportrequestdetails/get', obj).subscribe(res => {
      console.log(res);
      this.SupportRequestById = res.response[3];
      console.log('Support Request By Id', this.SupportRequestById)
    })


    this.apiSrvc.postmethod('supportrequestdetails/get', obj).subscribe(res => {
      console.log(res);
      this.SR_Count = res.response[5];
      console.log('SR_Count', this.SR_Count)
    })


    this.getStatusId();
    this.SupportRequestType();
  }


  SupportRequestType() {
    let obj = {
      "PSID": "0",
      "TID": "0"
    }
    this.apiSrvc.postmethod('supportrequesttype/get', obj).subscribe(res => {
      this.SupportRequestsType = res.response;
      console.log('SRT', this.SupportRequestsType);
    })
  }

  onSelect(val) {
    console.log(val);

    this.SRT_data(val);
  }


  SRT_data(val) {
   this.RequestSRT = [];
    const obj = {
      "PSID": 1,
      "TID": "1" 
    }
    this.apiSrvc.postmethod('supportrequesttype/get', obj).subscribe(res => {
      this.SRT_DATA = res.response;
      console.log('SRT DATA', this.SRT_DATA);
      this.SRT_DATA.forEach(e => {
        if(e.SRT_SRT_ID == val){
          this.RequestSRT.push(e);
          console.log('request SRT' , this.RequestSRT);
        }
      });
    })
  }

  // getDataId(val){
  //   this.RequestSRT =[];
  //   this.SRT_DATA.forEach(e => {
  //     if(e.SRT_SRT_ID == val.SRT_ID){
  //       this.RequestSRT.push(e);
  //       console.log('request SRT' , this.RequestSRT);
  //     }
  //   });
  // }


  AddPanel() {
    this.showGridDetails = false;
    this.showAddPanel = true;
    this.showPanel = false;
  }
  ShowPanel() {
    this.showGridDetails = false;
    this.showAddPanel = false;
    this.showPanel = true;
  }

  getStatusId() {
    
    let obj = {
      "Id": "",
    }
    this.apiSrvc.postmethod('requeststatus/get', obj).subscribe(res => {
      console.log(res);
      this.RequestStatusData = res.response;
      console.log('RequestStatus', this.RequestStatusData)
    })
  }

  EventClick(value) {
    this.requestData = []

    this.SupportRequestsData.forEach(e => {

      if (e.RD_RS_ID == value.RS_ID) {
        this.showGrid = true;
        this.showError = false;
        this.requestData.push(e);
        console.log(this.requestData);
      } if (this.requestData.length == 0) {
        this.showGrid = false;
        this.showError = true;
        this.result;
      }
    });

  }

  onChange(value) {
    this.requestData = []

    this.SupportRequestsData.forEach(e => {

      if (e.RD_RS_ID == value) {
        this.showGrid = true;
        this.showError = false;
        this.requestData.push(e);
        console.log(this.requestData);
      } if (this.requestData.length == 0) {
        this.showGrid = false;
        this.showError = true;
        this.result;
      }
    });
  }
  Cancel() {
    this.showGridDetails = true;
    this.showAddPanel = false;
    this.showPanel = false;
  }
  viewall(){
    this.showGridDetails = true;
    this.showAddPanel =false;
  }
}

