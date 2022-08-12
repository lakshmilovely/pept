import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';


@Component({
  selector: 'app-vacations',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.scss']
})
export class VacationsComponent implements OnInit {
  vacationsdata: any = [];
  val2: any;
  value: any;
  info: any = [];
  V_ID: any;
  [x: string]: any;
  selectedDate: any;
  datechange: Date;
  gustform: FormGroup;
  myform: FormGroup;
  showGrid: boolean = true;
  hideall: boolean;
  showEditPanel: boolean = false;
  vid: any;
  date: any;
  date1: any;
  reason: any;
  submitted = false;
  ngSelect = 1;
  selectedName: any;
  showAddPanel: boolean = false;
  Uid: any;
  designationId: any = [];
  selectedyear = new Date().getFullYear();


  constructor(public fb: FormBuilder, public srvc: ApiService, private spinner: NgxSpinnerService) {
    this.gustform = fb.group
      ({
        type: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        enddate: ['', [Validators.required]],
        text: ['', [Validators.required]]

      })

    this.myform = fb.group({
      types: ['', [Validators.required]],
      startDates: ['', [Validators.required]],
      enddates: ['', [Validators.required]],
      texts: ['', [Validators.required]]

    })
  }

  onChange(e) {
    //  alert(e.target.value);
    //  this.ngSelect = e.target.value


  }
  ngOnInit(): void {
    let obj = {
      "Id": "",
      "Expression": ""
    }
    this.srvc.postmethod('vactiontype/get', obj).subscribe(res => {
      this.vacationsdata = res.response;
      console.log("data is:", this.vacationsdata);
    })
    this.getvacation();
    this.getDesignations();    
  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }
  /*  GET DATA*/
  getvacation() {
    this.spinner.show();
    this.Uid = localStorage.getItem('key');
    console.log(this.Uid);
    let obj = {
      "EID": this.Uid,
      "LOCATIONID": "",
      "YEAR": this.selectedyear
    }
    this.srvc.postmethod('vacationsrequest/get', obj).subscribe(data => {
      console.log(data);
      this.info = data.response[0];
      this.spinner.hide();
      console.log('vacation request is:', this.info)
      console.log('vacation', this.info)
    })
  };

  getDesignations() {
    const Obj = {
      "Id": "63"
    }
    this.srvc.postmethod('designations/get', Obj).subscribe(res => {
      this.designationId = res.response[0];
      console.log(this.designationId);
      
    })
  }
  /* ADD FORM DATA*/
  adddata() {

    this.submitted = true;
    console.log("form submission");

    let startDate = this.gustform.value.startDate
    let enddate = this.gustform.value.enddate
    let text = this.gustform.value.text
    console.log(" request type is:", this.gustform.value.type)

    const obj = {
      "V_VT_ID": this.gustform.value.type,
      "V_POSTED_BY_U_ID": this.Uid,
      "V_REASON": text,
      "V_START_DATE": startDate,
      "V_END_DATE": enddate,
      "V_PERMISSION_DURATION": "",
      "V_STATUS": "Y",
      "V_REQUEST_TO_U_ID": this.designationId.DES_U_ID,
      "V_REQUEST_TO_U_EMAIL": this.designationId.USER_EMAIL,
      "V_COMMENTS": "",
      "V_ACTIVE": "Y"
    }

    console.log(obj);

    this.srvc.postmethod('vacationsrequest', obj).subscribe((res: any) => {
      console.log("res", res);
      if (res.status == 200) {
        console.log(res.status);
        alert('Vacation request sent successfully..')
        this.getvacation();
        this.showGrid = true;
        this.showAddPanel = false;
      }
      else {
        console.log(res);
        alert("All fields are mandatory..");
      }
      this.getvacation();
    })
  }




  AddPanel() {
    this.showGrid = false;
    this.showAddPanel = true;
    this.showEditPanel = false;
    this.gustform.reset();
    this.submitted = false;

    /*  HIDE PAST DATE */
    setTimeout(() => {
      var today = new Date().toISOString().split('T')[0];
      var dt = new Date(today)
      dt.setMonth(dt.getMonth())
      this.Today = dt.toISOString().split('T')[0]
      console.log("date", this.Today);
      document.getElementsByName('date1')[0].setAttribute('min', this.Today)
      document.getElementsByName('date2')[0].setAttribute('min', this.Today)
    })


  }
  update() {
    const obj = {
      "V_ID": this.vid,
      "V_VT_ID": this.myform.value.types,
      "V_POSTED_BY_U_ID": "1",
      "V_REASON": this.myform.value.texts,
      "V_START_DATE": this.myform.value.startDates,
      "V_END_DATE": this.myform.value.enddates,
      "V_PERMISSION_DURATION": "",
      "V_STATUS": "Y",
      "V_REQUEST_TO_U_ID": "232",
      "V_COMMENTS": "",
      "V_ACTIVE": "Y"
    }


    this.srvc.putmethod('vacationsrequest', obj).subscribe((res: any) => {
      console.log(res);
      console.log("id is:", this.vid)

      if (res.status == 200) {
        console.log(res);
        // alert("vacation updated sucessfully");
        alert(res.response)
        this.getvacation();
        location.reload();

      }
      else {
        console.log(res);
        alert("please check the details");
      }
    })
  }
  edit(Id: any) {
    console.log(Id);

    this.showEditPanel = true;
    this.showGrid = false;
    this.showAddPanel = false;

    this.vid = Id.V_ID
    this.myform = this.fb.group({

      types: [Id.V_VT_ID],
      startDates: [this.date = new Date(Id.V_START_DATE).toLocaleDateString('en-US').split('T')[0]],
      enddates: [this.date1 = new Date(Id.V_END_DATE).toLocaleDateString('en-US').split('T')[0]],
      texts: [Id.V_REASON]

    })
    console.log(this.date, this.myform.value);
    console.log("id is:", Id.V_VT_ID);

    this.reason = Id.V_REASON
    console.log("reason is", this.reason);



  }
  del(Id: any) {
    if (window.confirm(' Are you sure you want to delete this?')) {
      console.log("data", Id);
      console.log(this.V_ID = Id.V_ID);
      const obj = {
        "V_ID": this.V_ID
      }
      this.srvc.deletee(obj).subscribe((res: any) => {

        if (res.status == 200) {
          console.log(res.status)
          alert(" Request deleted successfully ")
          location.reload();

        }
        else {
          console.log(res)
          alert(res.error)
        }
      })

    }
  }
  viewall() {
    this.showGrid = true;
    this.showAddPanel = false;
    this.showEditPanel = false;
    this.gustform.reset();
    this.submitted = false
  }
  Cancel() {
    this.showGrid = true;
    this.showAddPanel = false;
    this.showEditPanel = false;
    this.submitted = false;
    this.gustform.reset();
  }
}