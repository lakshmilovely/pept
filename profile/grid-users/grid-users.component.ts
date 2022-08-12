import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-grid-users',
  templateUrl: './grid-users.component.html',
  styleUrls: ['./grid-users.component.scss']
})
export class GridUsersComponent implements OnInit {
  img: File;
  data: any;
  UD_ID: any;
  shotlist: any;
  genderlist: any;
  layform: FormGroup;
  userData: any = [];
  submitted = false;
  fileData: File = null;
  previewUrl: any = null;
  uploadedFileName: any;
  header = new HttpHeaders();
  showGrid: boolean = true;
  showAddPanel: boolean = false;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  public box: FormControl = new FormControl(false);
  isactive: boolean;
  isinactive: boolean;
  NoDetailFound: boolean=false;
  constructor(public srvc: ApiService, public fb: FormBuilder, public rtr: Router, private spinner: NgxSpinnerService) {
    this.layform = fb.group({
      empcode: ['', [Validators.required]],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      dofb: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      Alternate: ['', [Validators.required]],
      fathername: ['', [Validators.required]],
      mothername: ['', [Validators.required]],
      Emergency: ['', [Validators.required]],
      Spousename: ['', Validators.required],
      pancard: ['', [Validators.required]],
      License: ['', [Validators.required]],
      Passport: ['', [Validators.required]],
      primarym: ['', [Validators.required]],
      aadhaar: ['', [Validators.required]],
      voter: ['', [Validators.required]],
      Cemail: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      box: ['', [Validators.required]],
      city: ['', [Validators.required]],
      cy: ['', [Validators.required]],
      avatar: [null],
      sendingAddress: this.fb.group({  /* NESTED [FORMGROUP]*/
        Address: ['', [Validators.required]],
        state: [''],
        country: [''],
        city: [''],
        zip: ['', [Validators.required]]
      }),
      billingAddress: this.fb.group({   /* NESTED [FORMGROUP]*/
        Address: [''],
        state: [''],
        country: [''],
        city: [''],
        zip: ['', [Validators.required]]
      }),

    })
    /* Gender*/
    this.genderlist = [{ value: 'M', text: 'Male', selected: "checked" }, { value: 'F', text: 'Female', selected: "" }];
  }
  get myform() {
    return this.layform.get('gender');

  }

  ngOnInit(): void {
    /* Form Fields Using Other Field Values If Checkbox Is Selected*/
    this.box.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap(isSameAddress => {
        if (isSameAddress) {
          return this.layform.get('sendingAddress').valueChanges.pipe(
            startWith(this.layform.get('sendingAddress').value),
            tap(value => this.layform.get('billingAddress').setValue(value))
          )
        }
        else {
          this.layform.get('billingAddress').reset();
          return EMPTY;
        }
      })
    ).subscribe();
    this.genderlist.find(i => i.value == 'F').selected == "checked"
    this.getdata();
  }
  /* SHOW HIDE PANELS*/
  AddPanel() {
    this.showGrid = false;
    this.showAddPanel = true;
    this.submitted = false
    this.layform.reset();
  }
  Cancel() {
    this.showAddPanel = false;
    this.showGrid = true;
    this.previewUrl = '';
    this.submitted = false;
    this.layform.reset()
  }
  /* GET DATA*/
  getdata() {
    this.spinner.show();
    this.NoDetailFound=false;
    let obj =
    {
      "Id": "",
      "Expression": ""
    }
    this.srvc.postmethod('users/get', obj).subscribe(res => {
      console.log(res);
      this.userData = res.response;
      this.userData.sort((a: any, b: any) => a.U_NAME.localeCompare(b.U_NAME));
      this.NoDetailFound=true;
      console.log('Users', this.userData)
    })

  }
  /* ADD METHODE*/
  save() {
    this.submitted = true;

    let empcode = this.layform.value.empcode
    let fname = this.layform.value.fname
    let lname = this.layform.value.lname
    let dofb = this.layform.value.dofb
    let mail = this.layform.value.mail
    let phone = this.layform.value.phone
    let Alternate = this.layform.value.Alternate
    let fathername = this.layform.value.fathername
    let mothername = this.layform.value.mothername
    let Emergency = this.layform.value.Emergency
    let Spousename = this.layform.value.Spousename
    let pancard = this.layform.value.pancard
    let License = this.layform.value.License
    let Passport = this.layform.value.Passport
    let primarym = this.layform.value.primarym
    let aadhaar = this.layform.value.aadhaar
    let voter = this.layform.value.voter
    let Cemail = this.layform.value.Cemail
    let gender = this.layform.value.gender
    let fd: any = new FormData();
    const obj =
    {

      "User_Emp_Code": empcode,
      "User_Firstname": fname,
      "User_Lastname": lname,
      "User_Type": "",
      "User_Gender": gender,
      "User_Designation_Id": "",
      "User_Department_Id": "",
      "User_Fb_Id": "",
      "User_Gplus_Id": "",
      "User_Email": Cemail,
      "User_Personal_Email": mail,
      "password": "1234",
      "User_DOJ": "2022-03-01",
      "User_DOB": dofb,
      "User_Loc_Id": "",
      "User_Phone": phone,
      "User_Primary_Mobile": primarym,
      "User_Alternate_Mobile": Alternate,
      "User_Dor": "",
      "User_Reporting_To": "",
      "User_Reporting_Manager": "",
      "User_Active": "",
      "User_U_Id": "",
      "UserDetails_Fathername": fathername,
      "UserDetails_Mothername": mothername,
      "UserDetails_Spousename": Spousename,
      "UserDetails_Emergency_Phone": Emergency,
      "UserDetails_Current_Address": this.layform.controls.sendingAddress.value.Address,
      "UserDetails_Current_City": this.layform.controls.sendingAddress.value.city,
      "UserDetails_Current_State": this.layform.controls.sendingAddress.value.state,
      "UserDetails_Current_Country": this.layform.controls.sendingAddress.value.country,
      "UserDetails_Current_Zipcode": this.layform.controls.sendingAddress.value.zip,
      "UserDetails_Permanent_Address": this.layform.controls.billingAddress.value.Address,
      "UserDetails_Permanent_City": this.layform.controls.billingAddress.value.city,
      "UserDetails_Permanent_State": this.layform.controls.billingAddress.value.state,
      "UserDetails_Permanent_Country": this.layform.controls.billingAddress.value.country,
      "UserDetails_Permanent_Zipcode": this.layform.controls.billingAddress.value.zip,
      "UserDetails_Pancard": pancard,
      "UserDetails_Driving_Licence": License,
      "UserDetails_Passport": Passport,
      "UserDetails_Voter_Id": voter,
      "UserDetails_Adhaar_No": aadhaar,
      "UserDetails_PF_Number": "",
      "UserDetails_UAN": "",
      "UserDetails_Bank": "",
      "UserDetails_Bank_Acc_Number": "",
      "UserDetails_Desc": ""

    }
    fd.append('data', JSON.stringify(obj))
    if (this.uploadedFileName != '' && this.uploadedFileName != undefined) {
      fd.append('file', ...fd)

    }
    console.log('form data is :', ...fd)
    this.srvc.postusers('users', fd).subscribe(res => {
      if (res.status == 200) {
        console.log(res)
        alertify.success('Record inserted successfully');
        this.getdata();

      }

      else if (res.error == "User Already Exists") {
        console.log(res);
        alertify.error(res.error)

      }
      else {
        alertify.error(res.error)
      }



    },
    )

  }

  /* IMAGE PREVIEW*/
  public processFile(fileInput: any): void {
    this.fileData = <File>fileInput.target.files[0];
    this.uploadedFileName = <File>fileInput.target.files[0].name;
    console.log('file upload', this.uploadedFileName);
    const file = (fileInput.target as HTMLInputElement).files[0];
    this.layform.patchValue
      ({
        avatar: file
      });
    this.layform.get('avatar').updateValueAndValidity();
    this.preview();
  }
  public preview(): void {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
  /* EDIT METHODE*/
  edit(ID: any) {
    console.log(ID);
    // this.UD_ID = ID;
    this.rtr.navigate(['userprofile'])
    this.srvc.setdata(ID)
  }
  /* DELETE METHODE */
  del(Id: any) {
    if (window.confirm('Do You Want Delete This Record?')) {
      console.log("data", Id);
      const obj =
      {
        "User_Id": Id,
      }
      this.srvc.deleteusers(obj).subscribe((res: any) => {
        console.log(res);
        this.getdata()

        if (res.status == 200) {
          console.log(res.status)
          alertify.error('Record deleted successfully')
        }
        else {
          console.log(res)
          alert(res.error);
        }

      })
    }
  }

  viewall() {
    this.showGrid = true;
    this.showAddPanel = false;
    this.previewUrl = '';
  }

}