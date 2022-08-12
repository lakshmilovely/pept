import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';
import * as alertify from 'alertifyjs'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-relieving-letter',
  templateUrl: './relieving-letter.component.html',
  styleUrls: ['./relieving-letter.component.scss']
})
export class RelievingLetterComponent implements OnInit {
  userData: any = [];
  userHR: any = [];
  dateToday: any = "";
  singleUser: any;
  endDate: any;
  joinDate: any;
  submitted = false;
  RLform: FormGroup;

  letterForm = true;
  letter = false;
  U_ID: any;

  constructor(private apiSrvc: ApiService, public fb: FormBuilder) {
    this.RLform = this.fb.group({
      dateToday: ['', Validators.required],
      employee: ['', Validators.required],
      joinDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.dateToday = new Date().toISOString().slice(0, 10);
    console.log(this.dateToday);

    this.getdata();
    let obj =
    {
      "Id": "169",
      "Expression": ""
    }
    this.apiSrvc.postmethod('users/get', obj).subscribe(res => {
      console.log(res);
      this.userHR = res.response;
      console.log('HR Manager', this.userHR)
    })

  }



  get f() { return this.RLform.controls; }

  getdata() {

    let obj =
    {
      "Id": "",
      "Expression": ""
    }
    this.apiSrvc.postmethod('users/get', obj).subscribe(res => {
      console.log(res);
      this.userData = res.response;
      this.userData.sort((a: any, b: any) => a.U_NAME.localeCompare(b.U_NAME))
      console.log('Users', this.userData)
    })
  }
  
  onChange(value) {
    this.singleUser = []

    this.U_ID = value;
    console.log(value);
    console.log(this.userData)

    this.userData.forEach(res => {
      if (res.U_ID == value) {
        this.singleUser.push(res)
      }
      if (res.U_ID == value) {
        this.joinDate = res.U_DOJ.slice(0, 10);
      }


    })
    console.log("join date", this.joinDate);

  }

  preview() {
    if (this.RLform.invalid) {
      this.submitted = true;
    } else {
      this.letter = true;
      this.letterForm = false;
    }



  }
  Close() {
    this.letterForm = true;
    this.letter = false;
  }

  public captureScreen() {
    var data = document.getElementById("pdf-section");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL("image/png");
      let obj =
      {
        "Id": this.U_ID,
        "Expression": ""
      }
      let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF      
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      // pdf.save("RelievingForm.pdf");
      var myBlob = new Blob();
      myBlob = pdf.output('blob');
      var myFiles: File;
      myFiles = this.blobToFile(myBlob, 'RelievingForm.pdf');
      const formdata: any = new FormData();
      formdata.append('data', JSON.stringify(obj));
      formdata.append('file', myFiles);
      this.apiSrvc.postmethod('relievingletter/sendtomail', formdata).subscribe(res => {
        console.log(res)
        if (res.status == 200) {
          alertify.success('Email Sent Successfully');
        } else {
          alertify.error('Email Not sent');
        }
      })

    });

  }
  public blobToFile = (theBlob: Blob, fileName: string): File => {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
  }


}

