import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
// import { LoaderAnimationModule } from '../../Layout/loader-animation/loader-animation.module';

@Component({
  selector: 'app-occasions',
  templateUrl: './occasions.component.html',
  styleUrls: ['./occasions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
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

export class OccasionsComponent implements OnInit {
  arry: any = [];
  birthdays: any = [];
  brow1: any = [];
  Erow2: any = [];
  workanniversary: any = [];
  arry3: any = [];
  currentYear: number;
  data: any;

  constructor(private ngbmodalActive: NgbActiveModal, private srvc: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getdata();
  }

  getdata() {
    let row1: any;
    let row3: any;
    let ShortMonth: any = [];
    let arry2: any;
    let DOB: any;
    let day: any = 0;
    let dobmon: any = 0;
    this.currentYear = new Date().getUTCFullYear();
    let obj =
    {
      "Id": "",
      "Expression": ""
    }
    this.srvc.postmethod('users/get', obj).subscribe((res: any) => {
      this.arry = res.response;

      if (this.arry.length != 0) {
        for (let j = 1; j <= 12; j++) {
          row1 = "";
          for (var D = 1; D <= 31; D++) {
            row3 = "";
            for (let i = 0; i < this.arry.length; i++) {
              let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              if (this.arry[i].U_DOB != null || this.arry[i].U_DOB != undefined) {
                arry2 = this.arry[i].U_DOB.split("T");
                this.data = this.arry[i].U_NAME;
                DOB = arry2[0].split("-")
                day = DOB[2];
                dobmon = DOB[1];
                ShortMonth = monthShortNames[DOB[1] - 1];
              }

              if (j == dobmon) {

                if (D == day) {
                  if (row3 == "") {
                    row3 = 1; this.brow1 += `<div class="pop-row-inner"></div>`
                  }

                  if (row1 == "") {
                    row1 = 1; this.brow1 += `<div class="border123" ><span style="margin-left:4%;" class="ds-boxcontent-title1"></span></div>`
                  }
                  this.brow1 += `<div class="eview py-0 my-0"> ${ShortMonth} ${day} - <span class="ds-boxcontent-title1"> ${this.arry[i].U_NAME} </span></div>`

                }
              }
            }
            this.birthdays = this.brow1
            console.log(this.brow1);

          }
        }
      }
      let row2: any;
      let row4: any;
      let arry4: any;
      let dojShortMonth: any = [];
      let DOJ: any;
      let dojday: any;
      let dojmonth: any;
      let dojyear: any;
      let mm: any;
      this.arry3 = res.response;

      if (this.arry3.length != 0) {
        for (var z = 0; z <= 12; z++) {
          row2 = "";
          for (var D = 1; D <= 31; D++) {
            row4 = "";
            for (let i = 0; i < this.arry3.length; i++) {
              let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              if (this.arry3[i].U_DOJ != null || this.arry3[i].U_DOJ != undefined) {
                arry4 = this.arry3[i].U_DOJ.split('T');
                DOJ = arry4[0].split("-")
                dojday = DOJ[2];
                dojmonth = DOJ[1];
                dojyear = DOJ[0];
                dojShortMonth = monthShortNames[DOJ[1] - 1];
              }
              let date = new Date(), y = date.getFullYear(), d = date.getDate(), m = date.getMonth();
              let yy: any;
              let va: any;
              let txt: any;
              mm = parseInt(dojmonth) - m + 1;
              yy = y - parseInt(dojyear)
              if (yy >= 1) {
                va = "yes";
                if (yy == 1) {
                  if (dojmonth < m + 1) {
                    txt = " Completed " + yy + " Years";
                  } else {
                    if (dojmonth == m + 1) {
                      if (dojday <= d) {
                        txt = " Completed " + yy + " Years";
                      } else {
                        txt = " Will Complete " + yy + " Years";
                      }
                    } else {
                      txt = " Will Complete " + yy + " Years";
                    }
                  }
                }
                else if (yy > 1) {
                  if (dojmonth < m + 1) {
                    txt = " Completed " + yy + " Years";
                  } else {
                    if (dojmonth == m + 1) {
                      if (dojday <= d) {
                        txt = " Completed " + yy + " Years";
                      } else {
                        txt = " Will Complete " + yy + " Years";
                      }
                    } else {
                      txt = " Will Complete " + yy + " Years";
                    }
                  }
                }
              } else { va = "no"; }
              if (z == dojmonth) {
                if (D == dojday) {
                  if (row4 == "") {
                    row4 = 1; this.Erow2 += `<div class="pop-row-inner"></div>`
                  }
                  if (va == "yes") {
                    if (row2 == "") { row2 = 1; this.Erow2 += `<div class="border123"><span style="margin-left:4%;" class="ds-boxcontent-title1"></span></div>` }
                    this.Erow2 += `<div class="eview py-0 my-0" > ${dojShortMonth} ${dojday} - <span class='ds-boxcontent-title1'> ${this.arry3[i].U_NAME} - ${txt}  </span></div>`
                  }
                }
                this.workanniversary = this.Erow2
              }
            }
          }
        }
      }
    });
  }
  cancel() {
    this.ngbmodalActive.close();
  }
}
