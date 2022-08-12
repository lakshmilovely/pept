import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  model: NgbDateStruct;
  title = 'xtract-sales';
  date: any;
  startDate: any;
  endDate: any;
  usersNames: any = [];
  details: any = [];
  locationsData: any = [];
  Projects; any = [];
  today: any;
  days: any = [];
  holidays: any = [];
  FirstDay: any;
  LastDay: any;
  hldydata: any = [];
  startdate: any;
  index: any;
  enddate: any;
  startYear = new Date().getFullYear() - 1;
  endYear = new Date().getFullYear() + 1;
  selectedyear = new Date().getFullYear();
  selectedmonth = new Date().getMonth();
  dayz: any = [];
  holidayz: any;
  isdisable: boolean = false;
  predisable: boolean = false;

  vacationByName: any = [];
  vacationByProject: any = [];
  LOC_ID = 1003;
  Users: boolean = true;
  User: boolean = false;
  request_BE: any = [];
  fname: any;
  Dropdwn: any;
  colorBind: any = [];
  selectedID: any;
  byEmployee: boolean = false;
  byLocation: boolean = false;
  byproject: boolean = false;
  now: any;
  end: any;
  eve: any;
  eve1: any;
  // ByEmployees: any = [
  //   { "id": 0, "name": "All Employees", "u_id": "AE" },
  //   { "id": 1, "name": "By Employee", "u_id": "BE" },
  //   { "id": 2, "name": "By Location", "u_id": "BL" },
  //   { "id": 3, "name": "By Project", "u_id": "BP" },
  // ]
  ByEmployees = {
    Employeee: [{ id: 0, name: "All Employees", u_id: "AE" },
    { id: 1, name: "By Employee", u_id: "BE" },
    { id: 2, name: "By Location", u_id: "BL" },
    { id: 3, name: "By Project", u_id: "BP" },]
  }

  weekdays: any = [
    { "day": 'Mon', "val": 1 },
    { "day": 'Tue', "val": 2 },
    { "day": 'Wed', "val": 3 },
    { "day": 'Thu', "val": 4 },
    { "day": 'Fri', "val": 5 },
    { "day": 'Sat', "val": 6 }
  ]
  ShowMonth: boolean = false;
  ShowCalendar: boolean = true;
  HideClick: boolean = true;

  loading: boolean = true;
  loader: boolean = false;
  setAsDefault: number = 0;
  constructor(private apiSrvc: ApiService, public datepipe: DatePipe, private spinner: NgxSpinnerService, public router: Router) {
    for (var i = 0; i < 12; i++) {
      var d = new Date();
      d.setMonth(d.getMonth() - i);
      var month = d.toLocaleString("default", { month: "long" });
      const curdate = (new Date().getMonth() + 1).toString() + '-' + new Date().getFullYear().toString();

    }

  }

  months = [
    { id: "0", name: "January" },
    { id: "1", name: "February" },
    { id: "2", name: "March" },
    { id: "3", name: "April" },
    { id: "4", name: "May" },
    { id: "5", name: "June" },
    { id: "6", name: "July" },
    { id: "7", name: "August" },
    { id: "8", name: "September" },
    { id: "9", name: "October" },
    { id: "10", name: "November" },
    { id: "11", name: "December" }
  ];
  year: any = [];
  result: any = [];

  ngOnInit(): void {
    this.getcall();
    this.Holiday();
    this.users();

    this.today = new Date();
    this.startDate = new Date();

    this.endDate = new Date(this.startDate + 13);
    this.FirstDay = new Date();
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.year.push(i)
    }
    this.year.forEach((e, i) => {
      //  let d =[];
      this.result.push({ year: e, index: e })
      //////console.log(this.result);

    })
    this.selectedID = this.LOC_ID;
  }
  getdate(e, ref, syear, eyear) {
    if (this.selectedmonth != 11 && this.selectedyear != eyear) {
      this.isdisable = false;
      this.predisable = false;
    }
    else if (this.selectedmonth != 0 || this.selectedyear != syear) {
      this.isdisable = false;
      this.predisable = false
    }
    this.dayz = []
    if (ref == 'm') {
      ////console.log(e);
      this.selectedmonth = e
      var nowdate = new Date(this.selectedyear, this.selectedmonth, 1);
      this.startdate = new Date(this.selectedyear, this.selectedmonth, 1);
      this.enddate = new Date(nowdate.getFullYear(), nowdate.getMonth() + 1, 0);
      ////console.log("end:", this.enddate, 'start:', this.startdate, nowdate);
      this.SelectedWeekDates(this.startdate, this.enddate)
    }
    else {
      this.selectedyear = e
      var nowdate = new Date(this.selectedyear, this.selectedmonth, 1);
      this.startdate = new Date(this.selectedyear, this.selectedmonth, 1);
      this.enddate = new Date(nowdate.getFullYear(), nowdate.getMonth() + 1, 0);
      this.SelectedWeekDates(this.startdate, this.enddate);
      ////console.log("end", this.enddate, 'start', this.startdate);
    }

  }

  SelectedWeekDates(start, end): void {
    this.index = 0
    for (let q = start; q <= end; q.setDate(q.getDate() + 1)) {
      if (this.holidayz.findIndex(i => i.CH_DATE === q.toString().slice(0, 15)) >= 0) {
        let index = this.holidayz.findIndex(i => i.CH_DATE === q.toString().slice(0, 15))
        this.dayz.push({ "date": q.toString(), "name": this.holidayz[index].CH_TITLE });
      }
      else {
        this.dayz.push({ "date": q.toString(), "name": '' });
      }
      ////console.log(this.index)
    }
    if (this.weekdays.findIndex(i => i.day === this.dayz[0].date.slice(0, 3)) >= 0) {
      this.index = this.weekdays.findIndex(i => i.day === this.dayz[0].date.slice(0, 3)) + 1
      ////console.log('index', this.index)
      ////console.log(this.index)
    }
  }

  // addVacation() {
  //   this.router.navigate(['vacationrequest'])
  // }

  getcall() {
    let obj = {
      "Year": ""
    }
    this.apiSrvc.postmethod('companyholidays/get', obj).subscribe(res => {
      ////console.log(res);
      this.holidayz = res.response;
      ////console.log("company holidays", this.holidayz);
      this.holidayz.forEach((ele, i) => {
        ele.CH_DATE = new Date(ele.CH_DATE).toString().slice(0, 15)
      });
      ////console.log(this.holidayz);
      this.getdate(this.selectedmonth, 'm', this.startYear, this.endYear)
    })
  }
  pre(e) {
    this.isdisable = false
    if (this.selectedmonth == 0 && this.selectedyear == e) {
      this.predisable = true;
    }
    else {

      if (this.selectedmonth == 0) {
        this.selectedmonth = 12;
        this.selectedyear = this.selectedyear * 1 - 1
      }
      this.selectedmonth = this.selectedmonth * 1 - 1;
      ////////console.log("p",this.selectedmonth);
      var nowdate = new Date(this.selectedyear, this.selectedmonth, 1);
      this.startdate = new Date(this.selectedyear, this.selectedmonth, 1);
      this.enddate = new Date(nowdate.getFullYear(), nowdate.getMonth() + 1, 0);
      ////////console.log("end:",this.enddate ,'start:',this.startdate,nowdate);
      this.dayz = []
      this.SelectedWeekDates(this.startdate, this.enddate)
    }
  }

  nxt(e) {
    this.predisable = false;
    if (this.selectedmonth == 11 && this.selectedyear == e) {
      this.isdisable = true
    }
    else {
      this.selectedmonth = this.selectedmonth * 1 + 1;
      if (this.selectedmonth == 12) {
        this.selectedmonth = 0;
        this.selectedyear = this.selectedyear * 1 + 1;
      }
    }
    var nowdate = new Date(this.selectedyear, this.selectedmonth, 1);
    this.startdate = new Date(this.selectedyear, this.selectedmonth, 1);
    this.enddate = new Date(nowdate.getFullYear(), nowdate.getMonth() + 1, 0);
    ////////console.log("end:",this.enddate ,'start:',this.startdate,nowdate);
    this.dayz = []

    this.SelectedWeekDates(this.startdate, this.enddate)
  }

  prev() {
    let fromDate = new Date(this.days[0].day)
    let toDate = new Date(this.days[13].day)
    this.days = []
    this.endDate = new Date(toDate.setDate(toDate.getDate() - 14))
    this.startDate = new Date(fromDate.setDate(fromDate.getDate() - 14))
    this.DateFormat(fromDate, toDate);
    this.SetSelectedWeekDates(this.startDate, this.endDate);
    // this.onSelect(this.fname)
    this.ShowColors(this.eve);
    // this.ShowColorsByproject(this.eve1)
    // this.onSelect(this.request_BE,this.startDate,this.endDate)
  }

  next() {
    ////console.log(this.days)
    let fromDate = new Date(this.days[0].day)
    let toDate = new Date(this.days[13].day)
    this.days = []
    this.endDate = new Date(toDate.setDate(toDate.getDate() + 14))
    this.startDate = new Date(fromDate.setDate(fromDate.getDate() + 14))

    this.DateFormat(fromDate, toDate);
    this.SetSelectedWeekDates(this.startDate, this.endDate)
    // this.onSelect(this.request_BE,this.startDate,this.endDate)
    ////console.log(this.startDate);
    //  this.onSelect(this.fname)
    this.ShowColors(this.eve)

  }

  SetSelectedWeekDates(start, end): void {
    //console.log(start, end);
    let date;
    for (let q = start; q <= end; q.setDate(q.getDate() + 1)) {
      //console.log(q);

      //////console.log('...',this.holidays.indexOf(q.toString().slice(0,15)), q.toString().slice(0,15))
      if (q.toString().slice(0, 15) == this.today.toString().slice(0, 15)) {
        date = new Date(q).toISOString().slice(0, 10);
        //  alert(date)
        this.days.push({ "day": q.toString(), "design": 'currentday', "Title": '', "date": date, "leave": "false" });
        ////console.log(this.days);

      }
      else if (q.toString().slice(0, 1) == 'S') {
        date = new Date(q).toISOString().slice(0, 10);
        this.days.push({ "day": q.toString(), "design": 'weekend', "Title": '', "date": date, "leave": "false" });
      }
      else if (this.holidays.findIndex(i => i.holidaydate === q.toString().slice(0, 15)) >= 0) {
        let d = []
        this.holidays.forEach(e => {
          if (e.holidaydate == q.toString().slice(0, 15)) {
            d.push(e.Title)
          }
        })
        date = new Date(q).toISOString().slice(0, 10);
        this.days.push({ "day": q.toString(), "design": 'holiday', "Title": d, "date": date, "leave": "false" });

      }
      else {
        date = new Date(q).toISOString().slice(0, 10);

        this.days.push({ "day": q.toString(), "design": 'Empty', "Title": '', "date": date, "leave": "false" });
      }
      //console.log(this.days)
    }
  }
  PresentDay() {
    this.days = []
    this.startDate = new Date();
    this.FirstDay = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() + 13));
    this.SetSelectedWeekDates(this.startDate, this.endDate);
    this.ShowMonth = false;
    this.ShowCalendar = true;
    this.HideClick = true;
  }

  Holiday() {
    // ////console.log(this.days.length)
    const obj2 = {
      "Year": ''
    }
    this.apiSrvc.postmethod('companyholidays/get', obj2).subscribe(res => {
      // ////console.log(res)
      for (let i = 0; i < res.response.length; i++) {
        this.holidays.push({ holidaydate: new Date(res.response[i].CH_DATE).toString().slice(0, 15), Title: (res.response[i].CH_TITLE) });
        // ////console.log(this.holidays);

        this.hldydata.push({ Tiltle: (res.response[i].CH_TITLE) });
        // //////console.log(this.hldydata);     
      }

      this.startDate = new Date();
      //////console.log(this.startDate ,'hey');

      this.endDate = new Date(this.startDate);
      this.endDate = new Date(this.endDate.setDate(this.endDate.getDate() + 13));
      //////console.log(this.endDate);

      this.SetSelectedWeekDates(this.startDate, this.endDate);
    });
  }

  users() {
    this.spinner.show();
    let obj = {
      "Id": "",
      "Expression": ""
    }
    this.apiSrvc.postmethod('users/get', obj).subscribe(res => {
      this.details = res.response;
      //console.log(this.details);
      this.loading = false;
      this.spinner.hide();
      this.loader = true;
    })
  }

  onChange(e) {
    ////console.log(e);
    if (e == 'AE') {
      this.byEmployee = false;
      this.byLocation = false;
      this.byproject = false;
      this.Users = true;
      this.User = false;
      this.eve = false;
    } else if (e == 'BE') {
      let obj = {
        "Id": "",
        "Expression": ""
      }
      this.apiSrvc.postmethod('users/get', obj).subscribe(res => {
        //console.log(res);
        this.byEmployee = true;
        this.byLocation = false;
        this.byproject = false;
        this.usersNames = res.response;
      })
    } else if (e == 'BL') {
      let obj = {
        "Id": "",
        "Expression": ""
      }
      this.apiSrvc.postmethod('locations/get', obj).subscribe(res => {
        this.byEmployee = false;
        this.byLocation = true;
        this.byproject = false;
        this.eve = false;
        this.locationsData = res.response;
        //console.log(this.locationsData);
      })
    }
    else if (e == 'BP') {
      let obj = {
        "Id": "",
        "Expression": ""
      }
      this.apiSrvc.postmethod('calendar/getprojects', obj).subscribe(res => {
        this.byEmployee = false;
        this.byLocation = false;
        this.byproject = true;
        this.eve = false;
        this.Projects = res.response;
      })
    }
  }
  onSelect(e) {
    console.log(e);
    this.fname = e
    console.log(this.fname);
    ////////console.log(this.days);
    this.request_BE = []
    this.usersNames.forEach(data => {
      if (data.U_ID == e) {
        this.request_BE.push(data);
        //console.log('Request User', this.request_BE[0].U_ID);
        this.Users = false;
        this.User = true;
        this.ShowMonth = false;
        this.ShowCalendar = true;
        this.HideClick = true;
        this.ShowColors(e)
      }
    });
  }
  onSelectEvent(e) {
    console.log(e);
    this.fname = e
    console.log(this.fname);
    this.request_BE = [];
    this.details.forEach(data => {
      // console.log(data, e);
      if (data.U_LOC_ID == e) {
        this.request_BE.push(data);
        // console.log('Request User', this.request_BE);
        //console.log('Request User', this.request_BE[0].U_ID);
        this.Users = false;
        this.User = true;
        this.ShowMonth = false;
        this.ShowCalendar = true;
        this.HideClick = true;
        this.eve = false;
        // this.onSelect(this.fname)
      }
      else if (data.U_DEFAULT_PROJECT == e) {
        this.request_BE.push(data);
        console.log('Default Projects', this.request_BE);
        this.Users = false;
        this.User = true;
        this.eve = false;
        // this.onSelect(this.fname)
        // this.ShowColorsByproject(e)
      }
    });

  }
  ShowColors(e) {
    this.eve = e
    let obj = {

      "EXPRESSION": "U_ID ='" + `${e}` + "'"
    }
    this.apiSrvc.postmethod('calendar/bylocation', obj).subscribe(res => {
      this.vacationByName = res.response
      console.log("vacation By Name", this.vacationByName);
      for (let i = 0; i < this.vacationByName.length; i++) {
        if (this.vacationByName[i].V_VT_ID == 1, 9, 2, 4) {
          for (let q = new Date(this.vacationByName[i].V_START_DATE); q <= new Date(this.vacationByName[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
            //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
            let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
            ////console.log(index);
            this.days.forEach(item => {
              if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
                this.days[index].leave = "true";
                var d = []
                d.push(this.vacationByName[i].V_REASON)
                // //console.log(d);
                this.days[index].Title = d
                if (this.vacationByName[i].V_STATUS == "A") {
                  this.days[index].design = "approved";
                }
                if (this.vacationByName[i].V_STATUS == "P") {
                  this.days[index].design = "pending";
                }
                if (this.vacationByName[i].V_STATUS == "R") {
                  this.days[index].design = "rejected";
                }
                ////console.log(this.days)
              }
            })
          }
        }
        if (this.vacationByName[i].V_VT_ID == 3) {
          for (let q = new Date(this.vacationByName[i].V_START_DATE); q <= new Date(this.vacationByName[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
            //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
            let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
            ////console.log(index);
            this.days.forEach(item => {
              if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
                this.days[index].leave = "true";
                if (this.vacationByName[i].V_STATUS == "A") {
                  this.days[index].design = "permission";
                }
                if (this.vacationByName[i].V_STATUS == "P") {
                  this.days[index].design = "pending";
                }
                if (this.vacationByName[i].V_STATUS == "R") {
                  this.days[index].design = "rejected";
                }
                ////console.log(this.days)
              }
            })
          }
        }
        if (this.vacationByName[i].V_VT_ID == 6) {
          for (let q = new Date(this.vacationByName[i].V_START_DATE); q <= new Date(this.vacationByName[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
            //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
            let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
            ////console.log(index);
            this.days.forEach(item => {
              if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
                this.days[index].leave = "true";
                if (this.vacationByName[i].V_STATUS == "A") {
                  this.days[index].design = "wfhyd";
                }
                if (this.vacationByName[i].V_STATUS == "P") {
                  this.days[index].design = "pending";
                }
                if (this.vacationByName[i].V_STATUS == "R") {
                  this.days[index].design = "rejected";
                }
                ////console.log(this.days)
              }
            })
          }
        }
        if (this.vacationByName[i].V_VT_ID == 8) {
          for (let q = new Date(this.vacationByName[i].V_START_DATE); q <= new Date(this.vacationByName[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
            //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
            let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
            ////console.log(index);
            this.days.forEach(item => {
              if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
                this.days[index].leave = "true";
                if (this.vacationByName[i].V_STATUS == "A") {
                  this.days[index].design = "wfremote";
                }
                if (this.vacationByName[i].V_STATUS == "P") {
                  this.days[index].design = "pending";
                }
                if (this.vacationByName[i].V_STATUS == "R") {
                  this.days[index].design = "rejected";
                }
                ////console.log(this.days)
              }
            })
          }
        }
        if (this.vacationByName[i].V_VT_ID == 5) {
          for (let q = new Date(this.vacationByName[i].V_START_DATE); q <= new Date(this.vacationByName[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
            //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
            let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
            ////console.log(index);
            this.days.forEach(item => {
              if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
                this.days[index].leave = "true";
                if (this.vacationByName[i].V_STATUS == "A") {
                  this.days[index].design = "wfrjy";
                }
                if (this.vacationByName[i].V_STATUS == "P") {
                  this.days[index].design = "pending";
                }
                if (this.vacationByName[i].V_STATUS == "R") {
                  this.days[index].design = "rejected";
                }
                ////console.log(this.days)
              }
            })
          }
        }
      }
    })
  }

  // ShowColorsByproject(e) {
  //   this.eve1 = e
  //   console.log(this.eve1);

  //   let obj = {

  //     "PROJECTID":  "PRJ_ID ='" + `${e}` + "'"
  //   }
  //   this.apiSrvc.postmethod('calendar/byproject', obj).subscribe(res => {
  //     this.vacationByProject = res.response
  //     console.log("vacation By project", this.vacationByProject);
  //     for (let i = 0; i < this.vacationByProject.length; i++) {
  //       if (this.vacationByProject[i].V_VT_ID == 1, 9, 2, 4) {
  //         for (let q = new Date(this.vacationByProject[i].V_START_DATE); q <= new Date(this.vacationByProject[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
  //           //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
  //           let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
  //           ////console.log(index);
  //           this.days.forEach(item => {
  //             if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
  //               this.days[index].leave = "true";
  //               var d = []
  //               d.push(this.vacationByProject[i].V_REASON)
  //               // //console.log(d);
  //               this.days[index].Title = d
  //               if (this.vacationByProject[i].V_STATUS == "A") {
  //                 this.days[index].design = "approved";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "P") {
  //                 this.days[index].design = "pending";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "R") {
  //                 this.days[index].design = "rejected";
  //               }
  //               ////console.log(this.days)
  //             }
  //           })
  //         }
  //       }
  //       if (this.vacationByProject[i].V_VT_ID == 3) {
  //         for (let q = new Date(this.vacationByProject[i].V_START_DATE); q <= new Date(this.vacationByProject[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
  //           //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
  //           let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
  //           ////console.log(index);
  //           this.days.forEach(item => {
  //             if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
  //               this.days[index].leave = "true";
  //               if (this.vacationByProject[i].V_STATUS == "A") {
  //                 this.days[index].design = "permission";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "P") {
  //                 this.days[index].design = "pending";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "R") {
  //                 this.days[index].design = "rejected";
  //               }
  //               ////console.log(this.days)
  //             }
  //           })
  //         }
  //       }
  //       if (this.vacationByProject[i].V_VT_ID == 6) {
  //         for (let q = new Date(this.vacationByProject[i].V_START_DATE); q <= new Date(this.vacationByProject[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
  //           //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
  //           let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
  //           ////console.log(index);
  //           this.days.forEach(item => {
  //             if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
  //               this.days[index].leave = "true";
  //               if (this.vacationByProject[i].V_STATUS == "A") {
  //                 this.days[index].design = "wfhyd";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "P") {
  //                 this.days[index].design = "pending";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "R") {
  //                 this.days[index].design = "rejected";
  //               }
  //               ////console.log(this.days)
  //             }
  //           })
  //         }
  //       }
  //       if (this.vacationByProject[i].V_VT_ID == 8) {
  //         for (let q = new Date(this.vacationByProject[i].V_START_DATE); q <= new Date(this.vacationByProject[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
  //           //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
  //           let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
  //           ////console.log(index);
  //           this.days.forEach(item => {
  //             if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
  //               this.days[index].leave = "true";
  //               if (this.vacationByProject[i].V_STATUS == "A") {
  //                 this.days[index].design = "wfremote";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "P") {
  //                 this.days[index].design = "pending";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "R") {
  //                 this.days[index].design = "rejected";
  //               }
  //               ////console.log(this.days)
  //             }
  //           })
  //         }
  //       }
  //       if (this.vacationByProject[i].V_VT_ID == 5) {
  //         for (let q = new Date(this.vacationByProject[i].V_START_DATE); q <= new Date(this.vacationByProject[i].V_END_DATE); q.setDate(q.getDate() + 1)) {
  //           //////console.log(q,this.vacationByName[i].V_START_DATE.slice(0,10));
  //           let index = this.days.findIndex(d => d.day.slice(0, 15) === q.toString().slice(0, 15));
  //           ////console.log(index);
  //           this.days.forEach(item => {
  //             if (q.toString().slice(0, 15) == item.day.slice(0, 15)) {
  //               this.days[index].leave = "true";
  //               if (this.vacationByProject[i].V_STATUS == "A") {
  //                 this.days[index].design = "wfrjy";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "P") {
  //                 this.days[index].design = "pending";
  //               }
  //               if (this.vacationByProject[i].V_STATUS == "R") {
  //                 this.days[index].design = "rejected";
  //               }
  //               ////console.log(this.days)
  //             }
  //           })
  //         }
  //       }
  //     }
  //   })
  // }


  DateFormat(Start, End) {
    this.FirstDay = Start;
    this.endDate = End;
  }

  Month() {
    this.ShowMonth = true;
    this.ShowCalendar = false;
    this.HideClick = false;
    this.setAsDefault = 0;
    this.byEmployee = false;
    this.byLocation = false;
    this.byproject = false;
    this.setAsDefault = 0;
  }
  All() {
    this.ShowCalendar = true;
    this.ShowMonth = false;
    this.HideClick = true;
    this.Users = true;
  }
  // datePicker() {
  //   let d = $('#datepicker').datepicker({
  //     format: "dd/mm/yyyy"
  //   });
  ////console.log(d);
  // }
  changeDate(e) {
    this.days = []
    //console.log(e)
    let d = new Date(e.year + '-' + e.month + '-' + e.day);
    //console.log(d)
    this.now = d
    //console.log(this.now);
    this.end = new Date(this.now);
    this.end = new Date(this.end.setDate(this.end.getDate() + 13));
    //console.log(this.end);
    this.SetSelectedWeekDates(this.now, this.end);
    this.onSelect(this.fname)
    this.ShowMonth = false;
    this.ShowCalendar = true;
    this.days = []
    this.endDate = new Date(this.end.setDate(this.end.getDate()))
    this.startDate = new Date(this.now.setDate(this.now.getDate() - 14))
    this.DateFormat(this.now, this.end);
    this.SetSelectedWeekDates(this.startDate, this.endDate);
    // this.onSelect(this.fname)
    this.ShowColors(this.eve);
  }
  requests() {
    this.ShowCalendar = false;
  }
}
