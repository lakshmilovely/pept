import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { distinctUntilChanged, startWith, switchMap, tap } from 'rxjs/operators'
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { EMPTY, observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: any;
  img: File;
  U_ID: any;
  todayString;
  dummy: string;
  profileimg: any;
  info: any = [];
  genderlist: any;
  statusValue: any;
  submitted = false;
  myform: FormGroup;
  isactive: boolean;
  isstatus: boolean;
  dummyval: boolean;
  isinactive: boolean;
  addressform: FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  uploadedFileName: any = '';
  imageUrl = `${environment.apiUrl}`;
  image = this.imageUrl + 'resources/images/';
  public box: FormControl = new FormControl(false);

  constructor(public srvc: ApiService, public fb: FormBuilder, public rtr: Router, private spinner: NgxSpinnerService) {
    this.myform = fb.group({
      User_Active: [''],
      fname: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      lname: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      dofb: [''],
      mail: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      Alternate: [''],
      fathername: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      mothername: [''],
      Emergency: [''],
      Spousename: [''],
      pancard: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      License: [''],
      Passport: [''],
      primarym: [''],
      aadhaar: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],
      voter: [''],
      gender: [''],
      box: [''],
      city: [''],
      // cy: [''],
      doj: [''],
      sendingAddress: this.fb.group({  /* NESTED [FORMGROUP]*/
        Address: [''],
        state: [''],
        country: [''],
        city: [''],
        zip: ['']
      }),
      billingAddress: this.fb.group({   /* NESTED [FORMGROUP]*/
        Address: [''],
        state: [''],
        country: [''],
        city: [''],
        zip: ['']

      }),

    }),
      this.genderlist = [{ value: 'M', text: 'Male', selected: "checked" }, { value: 'F', text: 'Female', selected: "" }]; /*GENDER*/
  }
  get f() { return this.myform.controls; }

  ngOnInit(): void {
    /*FORM FIELDS USING OTHER FILRED VALUES IF CHECKBOX IS SELECTED  */
    this.box.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap(isSameAddress => {
        if (isSameAddress) {
          return this.myform
            .get('sendingAddress').valueChanges.pipe
            (
              startWith(this.myform.get('sendingAddress').value),
              tap
                (value =>
                  this.myform
                    .get('billingAddress').setValue(value)))

        }
        else {
          this.myform.get('billingAddress').reset();
          return EMPTY;
        }

      })
    )
      .subscribe();
    this.getdata();
    this.genderlist.find(i => i.value == 'F').selected == "checked"

  }
  /* GET DATA*/
  getdata() {
    this.spinner.show();
    this.srvc.getdata().subscribe((data: any) => {
      this.info = data
      if (this.info.U_ID == undefined) {
        this.id = localStorage.getItem('key');
      }
      else {
        this.id = this.info.U_ID
      }
    })
    let obj =
    {
      "Id": this.id,
      "Expression": ""
    }
    this.srvc.postmethod('users/get', obj).subscribe(data => {

      console.log(data.response);
      this.info = data.response[0];
      this.spinner.hide();

      this.U_ID = this.info.U_ID;
      this.myform.controls['fname'].setValue(this.info.U_FIRST_NAME) /* firstname*/
      this.myform.controls["lname"].setValue(this.info.U_LAST_NAME), /* lname*/
        this.myform.controls["dofb"].setValue(this.info.U_DOB), /* dofb*/
        this.myform.controls["mail"].setValue(this.info.U_PERSONAL_EMAIL), /* email*/
        this.myform.controls["phone"].setValue(this.info.U_PHONE_MOBILE), /* p_m*/
        this.myform.controls["Alternate"].setValue(this.info.U_ALTERNATE_MOBILE) /*alternate no*/
      this.myform.controls["fathername"].setValue(this.info.UD_FATHER_NAME), /* father name*/
        this.myform.controls["mothername"].setValue(this.info.UD_MOTHER_NAME)  /* mother name*/
      this.myform.controls["Emergency"].setValue(this.info.UD_EMERGENCY_PHONE), /* e phone*/
        this.myform.controls["Spousename"].setValue(this.info.UD_SPOUSE_NAME), /* spouse name*/
        this.myform.controls["primarym"].setValue(this.info.U_PRIMARY_MOBILE),  /* primary mobile*/
        this.myform.controls["pancard"].setValue(this.info.UD_PANCARD), /* pancard*/
        this.myform.controls["Passport"].setValue(this.info.UD_PASSPORT), /* Passport*/
        this.myform.controls["License"].setValue(this.info.UD_DRIVING_LICENCE), /* license*/
        this.myform.controls["aadhaar"].setValue(this.info.UD_ADHAAR_NO),/*aadhaar */
        this.myform.controls["voter"].setValue(this.info.UD_VOTER_ID),/* voter*/
        this.myform.controls["gender"].setValue(this.info.U_GENDER);/* GENDER */
      this.isactive = this.info.U_ACTIVE == "Y";
      this.isinactive = this.info.U_ACTIVE == "D";
      console.log('active', this.isactive, 'inactive', this.isinactive)
      if (this.info.U_ACTIVE == "Y") {
        this.myform.controls["User_Active"].setValue(this.info.U_ACTIVE)  /* status */
      }
      this.myform.get(['sendingAddress', "Address"]).setValue(this.info.UD_CURRENT_ADDRESS); /*sending address */
      this.myform.get(['sendingAddress', "state"]).setValue(this.info.UD_CURRENT_STATE);/* sending state */
      this.myform.get(['sendingAddress', "city"]).setValue(this.info.UD_CURRENT_CITY);/* sending city */
      this.myform.get(['sendingAddress', "country"]).setValue(this.info.UD_CURRENT_COUNTRY);/* sendig country*/
      this.myform.get(['sendingAddress', "zip"]).setValue(this.info.UD_CURRENT_ZIP_CODE);/*sending zipcode */
      this.myform.get('dofb').setValue(new Date(this.info.U_DOB).toLocaleDateString('en-US').split('T')[0]); /* date of birth (date conversation) */
      /* Date changes*/
      var todayString: string = new Date(this.info.U_DOJ).toLocaleDateString('en-US').split('T')[0]; /* date of joinning (date conversation) */
      console.log(todayString);
      this.info.U_DOJ = todayString
      this.profileimg = '';
      if (this.isactive == true) {
        this.statusValue = 'Y'
      }
      if (this.isinactive == true) {
        this.statusValue = 'D'
      }
    })
  }


  Cancel() {
    this.rtr.navigate(['userdashboard'])
    // this.spinner.show();
  }

  status(val) {
    console.log("val", val);
    if (val == true) {
      this.statusValue = "Y"
      this.isactive = true;
      this.isinactive = false;
    }
    else {
      this.statusValue = "D"
      this.isactive = false
      this.isinactive = true
    }
  }
  onFileChanged(event) {
    this.img = event.target.files[0];
  }
  updatedata() {
    console.log(this.myform.invalid);
    this.submitted = true;
    if (this.myform.invalid) {
      alert('Enter all required fields');
      return false;      
    }
    else {
      let formData: any = new FormData();
      console.log('ID', this.U_ID)
      if (window.confirm('Do you want to save the details')) {
        const obj =
        {
          "User_Id": this.U_ID,
          "User_Emp_Code": this.info.U_EMP_CODE,
          "User_Firstname": this.myform.value.fname,
          "User_Lastname": this.myform.value.lname,
          "User_Type": this.info.U_TYPE,
          "User_Gender": this.myform.value.gender,
          "User_Designation_Id": this.info.U_DESIGNATION_ID,
          "User_Department_Id": this.info.U_DEPARTMENT_ID,
          "User_Fb_Id": "",
          "User_Gplus_Id": "",
          "User_Email": this.info.U_EMAIL,
          "User_Personal_Email": this.myform.value.mail,
          "password": this.info.U_PASSWORD,
          "User_DOJ": this.info.U_DOJ,
          "User_DOB": this.myform.value.dofb,
          "User_Loc_Id": this.info.U_LOC_ID,
          "UserProfileImage": this.info.U_PROFILE_IMAGE,
          "User_Phone": this.myform.value.phone,
          "User_Primary_Mobile": this.myform.value.primarym,
          "User_Alternate_Mobile": this.myform.value.Alternate,
          "User_Dor": "",
          "User_Reporting_To": this.info.U_REPORTING_TO,
          "User_Reporting_Manager": "",
          "User_Active": this.statusValue,
          "User_U_Id": "",
          "UserDetails_Fathername": this.myform.value.fathername,
          "UserDetails_Mothername": this.myform.value.mothername,
          "UserDetails_Spousename": this.myform.value.Spousename,
          "UserDetails_Emergency_Phone": this.myform.value.Emergency,
          "UserDetails_Current_Address": this.myform.controls.sendingAddress.value.Address,
          "UserDetails_Current_City": this.myform.controls.sendingAddress.value.city,
          "UserDetails_Current_State": this.myform.controls.sendingAddress.value.state,
          "UserDetails_Current_Country": this.myform.controls.sendingAddress.value.country,
          "UserDetails_Current_Zipcode": this.myform.controls.sendingAddress.value.zip,
          "UserDetails_Permanent_Address": this.myform.controls.billingAddress.value.Address,
          "UserDetails_Permanent_City": this.myform.controls.billingAddress.value.city,
          "UserDetails_Permanent_State": this.myform.controls.billingAddress.value.state,
          "UserDetails_Permanent_Country": this.myform.controls.billingAddress.value.country,
          "UserDetails_Permanent_Zipcode": this.myform.controls.billingAddress.value.zip,
          "UserDetails_Pancard": this.myform.value.pancard,
          "UserDetails_Driving_Licence": this.myform.value.License,
          "UserDetails_Passport": this.myform.value.Passport,
          "UserDetails_Voter_Id": this.myform.value.voter,
          "UserDetails_Adhaar_No": this.myform.value.aadhaar,
          "UserDetails_PF_Number": this.info.UserDetails_PF_Number,
          "UserDetails_UAN": this.info.UD_UAN,
          "UserDetails_Bank": this.info.UD_BANK,
          "UserDetails_Bank_Acc_Number": this.info.UD_BANK_ACCOUNT_NUMBER,
          "UserDetails_Desc": ""
        };
        /* FORMDATA */

        formData.append('data', JSON.stringify(obj))
        if (this.uploadedFileName == '' && this.uploadedFileName == undefined) {
          formData.append('file', this.profileimg)
        }
        else {
          formData.append('file', this.fileData)
        }

        this.srvc.putmethod('users', formData).subscribe((res: any) => {
          console.log('form data is :', ...formData)
          if (res.status == 200) {
            console.log(res)
            this.rtr.navigate(['userdashboard'])
            alertify.success('Record updated successfully');
          }
          else {
            console.log(res)
            alert('Please check the details')
            alertify.error('Please check the details');
          }
        },
          (error) => {
            console.log(error);
          })

        this.getdata();
        this.rtr.navigate(['userprofile'])
      }
    }
  }
  public fileload(fileInput: any): void {
    console.log('upload event')
    this.fileData = <File>fileInput.target.files[0];
    this.uploadedFileName = <File>fileInput.target.files[0].name;
    console.log('file upload', this.uploadedFileName);
    const file = (fileInput.target as HTMLInputElement).files[0];
    this.myform.patchValue
      ({
        avatar: file
      });

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

}
