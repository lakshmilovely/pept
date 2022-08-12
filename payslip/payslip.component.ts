import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as alertify from 'alertifyjs'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.scss']
})
export class PayslipComponent implements OnInit {
  mailCount = 0;
  payslip: Boolean = false;
  payslipGrid: Boolean = true;
  data: any = [];
  // result: any = [];
  empname: any;
  empcode: any;
  pay: any = [];
  payId: any;
  Allpayslips: Boolean = false;
  JsonData: any = [];
  multiPDFS: any = [];
  admUserId: any;
  paylistresponse: any;
  paySlipaddObj: any = [];

  months = [
    { id: "1", name: "January" },
    { id: "2", name: "February" },
    { id: "3", name: "March" },
    { id: "4", name: "April" },
    { id: "5", name: "May" },
    { id: "6", name: "June" },
    { id: "7", name: "July" },
    { id: "8", name: "August" },
    { id: "9", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" }
  ];
  year: any = [];
  selectedYear: any = [];
  startYear = new Date().getFullYear() - 1;
  endYear = new Date().getFullYear() + 8;
  selectedmonth = new Date().getMonth();

  constructor(private apiSrvc: ApiService) { }

  ngOnInit(): void {
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.year.push(i)
    }
    this.year.forEach((e, i) => {
      this.selectedYear.push({ year: e, index: e })
    })
  }

  // onFileChange(evt: any) {
  //   const target: DataTransfer = <DataTransfer>(evt.target);
  //   if (target.files.length != 1) throw new Error('Cannot use multiple files');
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //     console.log(ws);
  //     this.result = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
  //     for (let i = 0; i < this.result.length; i++) {
  //       if (this.result[i].length != 0) {
  //         this.data.push(this.result[i]);
  //         console.log(this.data);
  //       }
  //     }
  //   };
  //   reader.readAsBinaryString(target.files[0]);

  // }

  onFileChange(evt: any) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = evt.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(dataString);
      this.JsonData = JSON.parse(dataString)
      this.data = this.JsonData.Sheet1
      this.data.forEach(function (s) {
        s.ischecked = false;
      })
      console.log("Final Obj with checked--->", this.data);

      // document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
    }
    reader.readAsBinaryString(file);
  }

  getdate(e, ref, syear, eyear) {
    console.log(e, ref, syear, eyear);


  }

  savePayslip() {
    console.log(this.data);
    this.admUserId = localStorage.getItem('key')
    for (let i = 0; i < this.data.length; i++) {
      const obj = {
        "payslipdata":
          [{
            "ps_pan_no": this.data[i].PanNo,
            "ps_basic": this.data[i].Basic,
            "ps_hra": this.data[i].HRA,
            "ps_conveyance": this.data[i].Conveyance,
            "ps_medical": this.data[i].MedicalAllowance,
            "ps_special": this.data[i].SpecialAllowance,
            "ps_pf": this.data[i].ProvidentFund,
            "ps_prof_tax": this.data[i].ProfessionalTax,
            "ps_income_tax": this.data[i].IncomeTax,
            "ps_loan": this.data[i].LoanAmount,
            "ps_esi_amount": this.data[i].ESIAmount,
            "ps_gross": this.data[i].GrossPay,
            "ps_deductions": this.data[i].Deductions,
            "ps_net_pay": this.data[i].NetPay,
            "ps_month": this.selectedmonth,
            "ps_year": '2022',
            "ps_comments": "",
            "ps_status": "Y",
            "ps_adm_user_id": this.admUserId
          }]
      }
      this.paySlipaddObj.push(obj)
      console.log('payslipObj', this.paySlipaddObj);
    }
    this.apiSrvc.postmethod('payslip', this.paySlipaddObj).subscribe((res: any) => {
      this.paylistresponse = res;
      if (this.paylistresponse.status == 200) {
        alertify.success('Pay slips inserted successfully')
      } else if (this.paylistresponse.status == 401) {
        alertify.console.error(this.paylistresponse.error);
      }
    })
  }

  checkParent(e) {
    console.log(e);
    if (e.target.checked == true) {
      this.data.forEach(function (s) {
        console.log(s);
        s.ischecked = true;
      })
      this.mailCount = this.data.length;
    } else {
      this.data.forEach(function (s) {
        s.ischecked = false;
      })
      this.mailCount = 0;
    }

    console.log("Checked Obj--->", this.data);
  }

  checkSingleParent(e, ind) {
    if (e.target.checked == true) {
      this.data[ind].ischecked = true;
    } else {
      this.data[ind].ischecked = false;
    }
  }


  multipayslips() {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].ischecked == true) {
        console.log('Data--->', this.data[i])
        this.pay = this.data[i];
        this.payId = this.data[i].EmployeeID;
        this.multiPDFS.push(this.data[i])
        setTimeout(() => {
          this.multicaptureScreen();
        }, 5000)
      }
    }

  }

  payslipShow(val: any) {
    console.log(val);
    this.pay = val;
    this.payId = this.pay.EmployeeID;
    console.log(this.payId);
    this.payslip = true;
    // this.data = val;
    this.payslipGrid = false;
  }

  // public captureScreen2(){
  //   let obj =
  //   {
  //     "Id": this.payId,
  //     "Expression": ""
  //   }
  //   var pdf = new jsPDF('p', 'pt', 'a4');  

  //   var canvas = pdf.canvas  
  //   canvas.height = 72 * 208;  
  //   canvas.width = 72 * 150;  
  //   var html = $("#pdf-section2").html();  
  //   var options = {  
  //       pagesplit: true  
  //   };  
  //   html2pdf(html, pdf, function(pdf) {  
  //       pdf.save('RequisationForm.pdf');  
  //   });  

  //   var myBlob = new Blob();
  //   myBlob = pdf.output('blob');
  //   var myFiles: File;
  //   myFiles = this.blobToFile(myBlob, 'Payslip.pdf');
  //   const formdata: any = new FormData();
  //   formdata.append('data', JSON.stringify(obj));
  //   formdata.append('file', myFiles);
  //   this.apiSrvc.postmethod('payslip/paysliptomail', formdata).subscribe(res => {
  //     console.log(res)
  //     if (res.status == 200) {
  //       alertify.success('Email Sent Successfully');
  //     } else {
  //       alertify.error('Email Not sent');
  //     }
  //   })
  // }


  public multicaptureScreen() {
    console.log('Step 1');
    for (var x = 0; x < this.multiPDFS.length; x++) {
      var data = document.getElementById("pdf-section" + x);
      html2canvas(data).then(canvas => {
        console.log('Step 2');
        // Few necessary setting options

        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL("image/png");
        let obj =
        {
          "Id": this.payId,
          "Expression": ""
        }
        console.log('Step 3', obj);
        let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF      
        var position = 0;
        setTimeout(() => {
          pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
          // pdf.save("Payslip.pdf");
          console.log('Step 4');
          var myBlob = new Blob();
          myBlob = pdf.output('blob');
          var myFiles: File;
          myFiles = this.blobToFile(myBlob, 'Payslip.pdf');
          const formdata: any = new FormData();
          formdata.append('data', JSON.stringify(obj));
          formdata.append('file', myFiles);
          console.log('Step 5');
          this.apiSrvc.postmethod('payslip/paysliptomail', formdata).subscribe(res => {
            console.log(res)
            if (res.status == 200) {
              alertify.success('Email Sent Successfully');
            } else {
              alertify.error('Email Not sent');
            }
          })
        }, 2000)

      });
    }
  }

  // public callbackBase64(base64Img)
  // {
  //        /*base64Img contains full base64string of image   */
  //        console.log(base64Img);
  // }

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
        "Id": this.payId,
        "Expression": ""
      }
      let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF      
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      // pdf.save("Payslip.pdf");
      var myBlob = new Blob();
      myBlob = pdf.output('blob');
      var myFiles: File;
      myFiles = this.blobToFile(myBlob, 'Payslip.pdf');
      const formdata: any = new FormData();
      formdata.append('data', JSON.stringify(obj));
      formdata.append('file', myFiles);
      this.apiSrvc.postmethod('payslip/paysliptomail', formdata).subscribe(res => {
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



  closePayslip() {
    this.payslip = false;
    this.payslipGrid = true;
  }

  payslips() {
    this.Allpayslips = true;
    this.payslipGrid = false;
  }

  closeAllPayslips() {
    this.Allpayslips = false;
    this.payslipGrid = true;
  }


}
function html2pdf(html: string, pdf: jsPDF, arg2: (pdf: any) => void) {
  throw new Error('Function not implemented.');
}

