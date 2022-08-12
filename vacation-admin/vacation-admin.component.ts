import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vacation-admin',
  templateUrl: './vacation-admin.component.html',
  styleUrls: ['./vacation-admin.component.scss']
})
export class VacationAdminComponent implements OnInit {
  vid: any;
  DId: any;
  userdata: any;
  SupportRequestsData: any = [];
  SupportRequestsType: any = [];
  RequestSRT: any = [];
  SRT_DATA: any = [];
  SR_Count: any = []
  SupportRequestById: any = [];
  // result = "No Records Found"
  showGrid: boolean = false;
  Pending: boolean = true;
  showPanel: boolean = false;
  showGridDetails: boolean = true;
  showAddPanel: boolean = false;
  showError: boolean = true;
  RequestStatusData: any = [];
  requestData: any = []
  reference: any;
  myform: FormGroup;
  genderlist: any;
  val: any;
  val1: any
  val2: any;
  date: any;
  ress: any;
  userdetails: any = []
  designationId: any = [];

  PendingCount: any;
  ApprovedCount: any;

  RejectCount: any;

  CancelledCount: any;
  date1: string;
  selectedyear = new Date().getFullYear();

  constructor(private apiSrvc: ApiService, public FB: FormBuilder, private spinner: NgxSpinnerService) {

    this.myform = this.FB.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      radio: ['', Validators.required],
      text: ['']

    })

    this.genderlist = [{ value: 'A', text: 'Approve', selected: "checked" },
    { value: 'P', text: 'Pending', selected: "" },
    { value: 'R', text: 'Reject', selected: '' }

    ]
  }

  ngOnInit(): void {
    this.getdata()
    this.genderlist.find(i => i.value == 'A').selected == "checked"
    this.getDesignations();

  }

  getDesignations() {
    const Obj = {
      "Id": "63"
    }
    this.apiSrvc.postmethod('designations/get', Obj).subscribe(res => {
      this.designationId = res.response[0];
      console.log(this.designationId);

    })
  }

  getdata() {
    this.spinner.show();
    let obj =
    {
      "EID": "0",
      "LOCATIONID": "1003",
      "YEAR": this.selectedyear
    }
    this.apiSrvc.postmethod('vacationsrequest/get', obj).subscribe((res: any) => {
      console.log(res);
      this.userdata = res.response[0];
      console.log("vacation", this.userdata)
      this.userdetails = res.response[0];
      this.spinner.hide();
      this.PendingCount = this.userdetails.filter(item => item.V_STATUS == 'P').length
      this.ApprovedCount = this.userdetails.filter(item => item.V_STATUS == 'A').length
      this.RejectCount = this.userdetails.filter(item => item.V_STATUS == 'R').length
      this.reference = 'P'
      this.EventClick('P', '')
    })

  }

  onSelect(val) {
    console.log(val);

  }

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
  EventClick(value, ref) {
    console.log(value);

    this.reference = value
    this.userdata = this.userdetails.filter(item => item.V_STATUS == value)
    console.log(this.userdata);

    this.showGrid = true;
    this.showError = false;

  }

  onChange(value) {
    console.log(value);
    this.reference = value
    this.userdata = this.userdetails.filter(item => item.V_STATUS == value)
    console.log(this.userdata);
    this.showGrid = true;
    this.showError = false;
  }

  
  edit(ID: any) {
    console.log("user id", ID);
    this.vid = ID;
    this.myform = this.FB.group({
      from: [this.date = new Date(ID.V_START_DATE).toLocaleDateString('en-US').split('T')[0], [Validators.required]],
      to: [this.date1 = new Date(ID.V_END_DATE).toLocaleDateString('en-US').split('T')[0], [Validators.required]],
      radio: [ID.V_STATUS, [Validators.required]],
      text: ['', Validators.required]

    })
    console.log(ID.NAME)
    // console.log(this.userdata.V_REASON);
    this.val = this.vid.NAME
    this.val1 = this.vid.VacationType
    this.val2 = this.vid.V_REASON
  }
  modal(Id: any) {
    console.log(Id)
    this.vid = Id.V_ID
    console.log(Id.V_REASON);
    this.ress = Id.V_REASON
  }

  update() {
    const obj = {
      "V_ID": this.vid.V_ID,
      "V_VT_ID": this.vid.V_VT_ID,
      "V_POSTED_BY_U_ID": "",
      "V_REASON": this.vid.V_REASON,
      "V_START_DATE": this.date,
      "V_END_DATE": this.date1,
      "V_PERMISSION_DURATION": "",
      "V_STATUS": this.myform.value.radio,
      "V_REQUEST_TO_U_ID": "",
      "V_REQUEST_TO_U_EMAIL": "",
      "V_COMMENTS": this.myform.value.text,
      "V_ACTIVE": "Y"
    }
    console.log(obj);
    
    this.apiSrvc.putmethod("vacationsrequest", obj).subscribe((res: any) => {
      console.log(res)      
      if (res.status == 200) {
        console.log(res);
        alert("vacation updated sucessfully");
        this.getdata();      
      }
      else {
        console.log(res);
        // alert("please check the details");
        // location.reload()
      }
    })
  }


  StatusChange(ID: any, status) {
    console.log('status', ID, status);
    let msg;
    if (status == 'A') {
      msg = ' approve'
    }
    else {
      msg = ' reject'
    }
    if (window.confirm('Do you want to' + msg + ' this request?')) {
      const obj = {
        "V_ID": ID.V_ID,
        "V_VT_ID": ID.V_VT_ID,
        "V_POSTED_BY_U_ID": "",
        "V_REASON": ID.V_REASON,
        "V_START_DATE": ID.V_START_DATE.slice(0, 10),
        "V_END_DATE": ID.V_END_DATE.slice(0, 10),
        "V_PERMISSION_DURATION": "",
        "V_STATUS": status,
        "V_REQUEST_TO_U_ID": "",
        "V_REQUEST_TO_U_EMAIL": "",
        "V_COMMENTS": "",
        "V_ACTIVE": "Y"
      }
      console.log(obj);
      this.apiSrvc.putmethod('vacationsrequest', obj).subscribe((res: any) => {
        console.log(res);
        if (res.status == 200) {
          alert('Request' + msg + ' successfully....')
          this.getdata();
        }
        else {
          console.log(res.error);
        }
      })

    }
  }


  del(ID: any) {

    if (window.confirm(' Are you sure you want to delete this?')) {

      console.log("ID", ID)

      this.DId = ID.V_ID
      console.log(this.DId);
      const obj = {
        "V_ID": this.DId
      }
      this.apiSrvc.deletee(obj).subscribe((res: any) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res);
          alert(" Request Delete Sucessfully..!!")
          this.getdata();

        }
        else {
          alert(res.error)
        }
        // location.reload()
      })

    }

  }

}