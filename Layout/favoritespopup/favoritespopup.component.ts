import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-favoritespopup',
  templateUrl: './favoritespopup.component.html',
  styleUrls: ['./favoritespopup.component.scss']
})
export class FavoritespopupComponent implements OnInit {

  FavData: any;
  favouriteaddForm: FormGroup;
  submitted = false;
  showAddPanel: boolean = false;
  showEditPanel: boolean = false;

  showGrid: boolean = true;
  save1: boolean = false;
  save2: boolean = false;
  FAV_ID: any;
  EditForm: any;
  requestType: any = '';


  isactive: boolean;
  isinactive: boolean;
  dummy: string;
  checkbox: boolean;
  checkbox1: boolean;
  UID_numb = localStorage.getItem('key')
  UID_numb1 = localStorage.getItem('favId')
  constructor(private ngbmodalActive: NgbActiveModal, private fb: FormBuilder, private apiservice: ApiService,) {
    this.favouriteaddForm = this.fb.group({
      Title: ['', [Validators.required]],
      PageURL: ['', Validators.required],
      Sequence: ['', Validators.required],
      FAV_ACTIVE: ['']
    });
  }

  ngOnInit(): void {

    this.getdata();

  }
  getdata() {

    if (this.UID_numb1 == "") {
      this.favouriteaddForm.reset();
      this.save1 = true;
      this.save2 = false;
      this.checkbox = false;
      this.checkbox1 = true;
    }
    else {
      let obj = {
        "ACTION": "R",

        "FAV_ID": this.UID_numb1,

        "FAV_U_ID": this.UID_numb
      }

      this.apiservice.postmethod('favorites/get', obj).subscribe(data => {
        this.FavData = data.response[0]
        console.log('data', this.FavData[0]);
        this.checkbox = true;
        this.favouriteaddForm.controls["Title"].setValue(this.FavData[0].FAV_TITLE)
        this.favouriteaddForm.controls["PageURL"].setValue(this.FavData[0].FAV_URL)
        this.favouriteaddForm.controls["Sequence"].setValue(this.FavData[0].FAV_SEQ)
        this.FAV_ID = this.FavData[0].FAV_ID
        this.isactive = this.FavData[0].FAV_ACTIVE == "Y";
        this.isinactive = this.FavData[0].FAV_ACTIVE == "D";
        if (this.FavData[0].FAV_ACTIVE == "Y") {
          this.favouriteaddForm.controls["FAV_ACTIVE"].setValue(this.FavData[0].FAV_ACTIVE)

        }
        if (this.isactive == true) {
          this.dummy = 'Y'
        }
        if (this.isinactive == true) {
          this.dummy = 'D'
        }
      })
      this.save1 = false;
      this.save2 = true;
      this.checkbox = true;
      this.checkbox1 = false;
    }
  }
  get f() { return this.favouriteaddForm.controls; }

  get f2() { return this.favouriteaddForm.controls; }
  cancel() {
    this.favouriteaddForm.reset()
    this.ngbmodalActive.close();
  }
  addfavorites() {
    this.submitted = true;

    if (this.favouriteaddForm.invalid) {
      return false;
    }
    let Title = this.favouriteaddForm.value.Title;
    let PageURL = this.favouriteaddForm.value.PageURL;
    let Sequence = this.favouriteaddForm.value.Sequence;

    const obj = {

      "FAV_TITLE": Title,
      "FAV_URL": PageURL,
      "FAV_SEQ": Sequence,
      "FAV_SHOW_IN_DASHBOARD": "Y",
      "FAV_U_ID": this.UID_numb,
      "FAV_ACTIVE": "Y"
    }

    this.apiservice.postmethod('favorites', obj).subscribe(data => {
      console.log(data);
      alertify.success('Record Added successfully');
      // window.location.reload()
    });

    this.ngbmodalActive.close();

  }

  saveedit() {
    this.submitted = true;
    if (this.favouriteaddForm.invalid) {
      return false;
    }
    let Title = this.favouriteaddForm.value.Title;
    let PageURL = this.favouriteaddForm.value.PageURL;
    let Sequence = this.favouriteaddForm.value.Sequence;



    const obj = {
      "FAV_ID": this.FAV_ID,

      "FAV_TITLE": Title,

      "FAV_URL": PageURL,

      "FAV_SEQ": Sequence,

      "FAV_SHOW_IN_DASHBOARD": "Y",

      "FAV_U_ID": this.UID_numb,

      "FAV_ACTIVE": this.dummy
    }
    console.log(obj);

    this.apiservice.putmethod('favorites', obj).subscribe(data => {
      console.log(data)
      alertify.success('Record Added successfully');

    });
    this.showAddPanel = false;
    this.showGrid = true;
    this.checkbox = true;
    this.ngbmodalActive.close();

  }
  status(val) {


    if (val == true) {
      this.dummy = "Y";
      this.isactive = true;
      this.isinactive = false;
    }
    else {
      this.dummy = "D";
      this.isactive = false;
      this.isinactive = true;
    }

  }
  delete(Id: any) {
    // console.log(Id);
    this.FAV_ID = Id.FAV_ID
    const obj = {
      "FAV_ID": this.FAV_ID,
    }
    this.apiservice.deletemethod('favorites', obj).subscribe(res => {
      console.log(res)
      alert("are you want to delete")
      alertify.error('Record deleted successfully');

    })
  }
}
