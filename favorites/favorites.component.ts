import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as alertify from 'alertifyjs'
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
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


  isactive: boolean;
  isinactive: boolean;
  dummy: string;
  FAV_ACTIVE: any;
  checkbox: boolean;
  checkbox1: boolean;
  UID_numb=localStorage.getItem('key')
  constructor(private apiservice: ApiService, private router: Router, private fb: FormBuilder) {
    this.favouriteaddForm = this.fb.group({
      Title: ['', [Validators.required]],
      PageURL: ['', Validators.required],
      Sequence: ['', Validators.required],

    });

  }

  ngOnInit(): void {
    this.getfavorites()

  }

  getfavorites() {
    var obj = {
      "ACTION": "R",

      "FAV_ID": "0",

      "FAV_U_ID": "120"
    }
    this.apiservice.postmethod('favorites/get', obj).subscribe(data => {
      this.FavData = data.response['0']
      console.log(this.FavData);
    })
  }


  get f() { return this.favouriteaddForm.controls; }

  get f2() { return this.favouriteaddForm.controls; }



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
      "FAV_U_ID": this. UID_numb,
      "FAV_ACTIVE": "Y"
    }

    this.apiservice.postmethod('favorites', obj).subscribe(data => {
      console.log(data);
      alertify.success('Record updated successfully');
    });
    this.showAddPanel = false;
    this.showGrid = true;
    this.save1 = true;
    this.save2 = false;
    this.checkbox = false;


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

      "FAV_U_ID": "120",

      "FAV_ACTIVE": "Y"
    }
    console.log(obj);

    this.apiservice.putmethod('favorites', obj).subscribe(data => {
      console.log(data)
      alertify.success('Record Added successfully');
    });
    this.showAddPanel = false;
    this.showGrid = true;
    this.checkbox = true;


  }

  EditPanel(Id: any) {
    console.log(Id);

    this.favouriteaddForm = this.fb.group({
      Title: ['', [Validators.required]],
      PageURL: ['', Validators.required],
      Sequence: ['', Validators.required],
      FAV_ACTIVE: [''],

    });

    this.favouriteaddForm.controls["Title"].setValue(Id.FAV_TITLE)
    this.favouriteaddForm.controls["PageURL"].setValue(Id.FAV_URL)
    this.favouriteaddForm.controls["Sequence"].setValue(Id.FAV_SEQ)
    this.FAV_ID = Id.FAV_ID
    this.isactive = Id.RT_ACTIVE == "Y";
    this.isinactive = Id.RT_ACTIVE == "D";
    if (Id.FAV_ACTIVE == "Y") {
      this.favouriteaddForm.controls["FAV_ACTIVE"].setValue(Id.FAV_ACTIVE)

    }
    if (this.isactive == true) {
      this.dummy = 'Y'
    }
    if (this.isinactive == true) {
      this.dummy = 'D'
    }


    // this.showAddPanel = true;
    // this.showGrid = false;

    this.save1 = false;
    this.save2 = true;
    this.checkbox = true;
    this.checkbox1 = false;
  }
  delete(Id: any) {
    // console.log(Id);
    this.FAV_ID = Id.FAV_ID
    const obj = {
      "FAV_ID": this.FAV_ID,
    }
    this.apiservice.deletemethod('favorites', obj).subscribe(res => {
      console.log(res)
      alertify.error('Record deleted successfully');
    })
  }

  Cancel() {
    this.showAddPanel = false;
    this.showEditPanel = false;
    this.showGrid = true;
  }
  viewall() {
    this.showGrid = true;
    this.showAddPanel = false;
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

  addopen() {

    this.favouriteaddForm.reset()
    this.save1 = true;
    this.save2 = false;
    this.checkbox = false;
    this.checkbox1 = true;
  }

}
