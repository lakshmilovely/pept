import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { environment } from '../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { OccasionsComponent } from '../occasions/occasions.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate(800)
      ]),
      transition('* => void', [
        animate(800, style({ opacity: 0, transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  usersData: any = [];
  imageUrl = `${environment.apiUrl}`;
  image = this.imageUrl + 'resources/images/';

  // Holidays
  closeResult: string;
  arry: any = [];
  cdate = new Date().toISOString().slice(0, 4);
  convertednumber: number;
  spiltDate: any = [];
  records: boolean = true;
  norecords: boolean = false;
  jan: any = []
  feb: any = []
  mar: any = []
  apr: any = []
  may: any = []
  jun: any = []
  jul: any = []
  aug: any = []
  sep: any = []
  oct: any = []
  nov: any = []
  dec: any = []
  id: any;
  requestType: any = '';
  FavData: any = [];

  constructor(private apiSrvc: ApiService, private modalService: NgbModal, private ngbmodal: NgbModal,
    private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit(): void {   
    this.id = localStorage.getItem('key');
    this.getfavorites();
    console.log("id is", this.id);
    this.spinner.show()
    let obj = {
      "Id": this.id,
      "Expression": ""
    }
    this.apiSrvc.postmethod('users/get', obj).subscribe(res => {
      console.log(res);
      this.usersData = res.response;
      console.log('Users', this.usersData)
    })
    this.convertednumber = + this.cdate
    // this.DefaultYear(this.convertednumber)
  }

  editUser(val) {
    console.log(val);
    this.router.navigate(['userprofile'])
    this.apiSrvc.setdata(val[0]);
  }

  DefaultYear(val) {
    // this.spinner.show();

    const obj = {
      "Year": val
    }
    this.apiSrvc.postmethod('companyholidays/get', obj).subscribe(res => {
      console.log(res.response.length);
      this.arry = res.response;
      // this.spinner.hide();
      if (res.response.length != 0) {
        this.records = true;
        this.norecords = false;
        for (let i = 0; i < this.arry.length; i++) {


          if (this.arry[i].CH_DATE) {

            this.spiltDate.push(this.arry[i].CH_DATE);
            // console.log(this.spiltDate);

            // console.log(this.spiltDate[i].slice(5, 7))

            if (this.spiltDate[i].slice(5, 7) == "01") {
              //  alert("abc")
              //     console.log("jan",this.arry[i]);
              this.jan.push(this.arry[i])
              //  console.log(this.jan);

            }
            else if (this.spiltDate[i].slice(5, 7) == "02") {
              this.feb.push(this.arry[i])

            }
            else if (this.spiltDate[i].slice(5, 7) == "03") {
              this.mar.push(this.arry[i])

            }
            else if (this.spiltDate[i].slice(5, 7) == "04") {
              this.apr.push(this.arry[i])

            }
            else if (this.spiltDate[i].slice(5, 7) == "05") {
              this.may.push(this.arry[i])

            }
            else if (this.spiltDate[i].slice(5, 7) == "06") {
              this.jun.push(this.arry[i])

            } else if (this.spiltDate[i].slice(5, 7) == "07") {
              this.jul.push(this.arry[i])

            } else if (this.spiltDate[i].slice(5, 7) == "08") {
              this.aug.push(this.arry[i])

            } else if (this.spiltDate[i].slice(5, 7) == "09") {
              this.sep.push(this.arry[i])

            } else if (this.spiltDate[i].slice(5, 7) == "10") {
              this.oct.push(this.arry[i])

            } else if (this.spiltDate[i].slice(5, 7) == "11") {
              this.nov.push(this.arry[i])

            } else if (this.spiltDate[i].slice(5, 7) == "12") {
              this.dec.push(this.arry[i])

            }
          }
        }
      }
      else {
        this.records = false;
        this.norecords = true;
      }
    });
  }

  PreviousYear(val) {
    this.spiltDate = []
    this.jan = []
    this.feb = []
    this.mar = []
    this.apr = []
    this.may = []
    this.jun = []
    this.jul = []
    this.aug = []
    this.sep = []
    this.oct = []
    this.nov = []
    this.dec = []
    this.convertednumber = val - 1;
    this.DefaultYear(this.convertednumber)
  }

  Nextyear(val) {
    this.spiltDate = []
    this.jan = []
    this.feb = []
    this.mar = []
    this.apr = []
    this.may = []
    this.jun = []
    this.jul = []
    this.aug = []
    this.sep = []
    this.oct = []
    this.nov = []
    this.dec = []
    this.convertednumber = val + 1;
    this.DefaultYear(this.convertednumber)
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.spiltDate = []
    this.jan = []
    this.feb = []
    this.mar = []
    this.apr = []
    this.may = []
    this.jun = []
    this.jul = []
    this.aug = []
    this.sep = []
    this.oct = []
    this.nov = []
    this.dec = []
    this.DefaultYear(this.convertednumber)

  }

  private getDismissReason(reason: any): any {
    if (reason === ModalDismissReasons.ESC) {

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

    } else {

    }

    let cdate = new Date().toISOString().slice(0, 4);

    this.convertednumber = + cdate
  }

  opencontact(type) {
    this.requestType = type;
    const modalRef = this.ngbmodal.open(OccasionsComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
    this.DefaultYear(this.convertednumber)
    modalRef.componentInstance.user = this.requestType;
  }

  getfavorites() {
    const obj = {
      "ACTION": "R",
      "FAV_ID": "0",
      "FAV_U_ID": this.id
    }
    this.apiSrvc.postmethod('favorites/get', obj).subscribe((res: any) => {
      console.log(res);      
      this.FavData = res.response['0']
      console.log(this.FavData);
    })
  }

}
