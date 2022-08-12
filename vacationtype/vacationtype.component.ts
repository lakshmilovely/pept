import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import {

  trigger,

  state,

  style,

  animate,

  transition

} from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-vacationtype',
  templateUrl: './vacationtype.component.html',
  styleUrls: ['./vacationtype.component.scss'],
  animations: [

    trigger('fadeInOut', [

      state('in', style({ opacity:1,transform: 'translateY(0)' })),

      transition('void => *', [

        style({ opacity:0,transform: 'translateY(100%)' }),

        animate(800)

      ]),

      transition('* => void', [

        animate(800, style({ opacity:0,transform: 'translateY(100%)' }))

      ])

    ])

  ]
})
export class VacationtypeComponent implements OnInit {
  gustform: FormGroup;
  projectdata: any;
  showAddPanel:boolean=false;
  showGrid:boolean=true;
  save1:boolean=false;
  save2:boolean=false;
  VT_ID: any;
  submitted: boolean;
  projectinsert: any;
  display123:boolean=true;
  hideall: boolean;
  isactive: boolean;
  isinactive: boolean;

  dummy: any;
  constructor(public srvc:ApiService,public fb: FormBuilder,public rtr: Router, private spinner: NgxSpinnerService) { 
    this.gustform = this.fb.group({
      vacationtype: ['', Validators.required],
      VT_ACTIVE:[''],
    });
  }

  ngOnInit(): void {
    this.getdata();
  }
  getdata() {
    this.spinner.show();
    this.showGrid = false;
    let obj = {
      "Id": "",
      "Expression": ""
    }
    this.srvc.postmethod('vactiontype/get', obj).subscribe(res => {

      this.projectdata = res.response;
      this.spinner.hide();
      this.showGrid = true;
      console.log(this.projectdata);
    })
  }
  addinsert(){
    this.submitted = false;
    this.showAddPanel=true;
    this.showGrid=false;
    this.save1=true;
    this.save2=false;
    this.gustform.reset();
    this.display123=false;
    this.hideall=false;
  }
  EditPanel(Id){
    console.log(Id);
    
    this.gustform.controls["vacationtype"].setValue(Id.VT_NAME);
    this.VT_ID=Id.VT_ID;
    this.showAddPanel=true;
    this.showGrid=false;
    this.save1=false;
    this.save2=true;
    this.display123=false;
    this.hideall=true;
    this.isactive= Id.VT_ACTIVE=="Y";
   this.isinactive= Id.VT_ACTIVE=="D";
   if(Id.VT_ACTIVE=="Y")
   {
     this.gustform.controls["VT_ACTIVE"].setValue(Id.VT_ACTIVE)

   }
   if(this.isactive==true)
   {
     this.dummy='Y'
   }
   if(this.isinactive==true)
   {
     this.dummy='D'
   }
  }
  insert(){
    this.submitted = true;
    if (this.gustform.invalid) { 
      return false;
    }
    const obj = {
      "VT_NAME":  this.gustform.value.vacationtype,
      "VT_ACTIVE": "Y",
      "VT_U_ID": 2,
  }
    this.srvc.postmethod('vactiontype', obj).subscribe(res => {
    console.log(res)
    this.getdata();
    this.projectinsert = res.response;
    alertify.success('Record inserted successfully');
    console.log( this.projectinsert );
    
  })
    this.showAddPanel = false;
    this.display123=true;
  }
  get f() { return this.gustform.controls; }
  saveedit(){
    this.submitted = true;
    if (this.gustform.invalid) { 
      return false;
    }   
     

   
    const obj={
      "VT_ID": this.VT_ID,
      "VT_NAME": this.gustform.value.vacationtype ,
      "VT_ACTIVE": this.dummy,
      "VT_U_ID": "2"
 }
 
     this.srvc.putmethod('vactiontype',obj).subscribe(data=>{
      console.log(data)
      alertify.success('Record updated successfully');
      this.getdata(); 
     });     
     
     this.showAddPanel = false;
     this.display123=true;
  }
  delete(Id:any){
    this.VT_ID=Id.VT_ID;
    const obj = {
      "VT_ID": this.VT_ID,  
    }
    this.srvc.deletemethod('vactiontype',obj).subscribe(res=>{
      console.log(res)
      alertify.error('Record deleted successfully');
      this.getdata();

     })
   
  }
  Cancel(){
    this.showAddPanel=false;
    this.showGrid=true;
    this.display123=true;
    this.gustform.reset();
  }
  status(val){

    if(val ==true)
    {
      this.dummy="Y";
      this.isactive = true;
      this.isinactive = false;
    }
    else
    {
      this.dummy="D";
      this.isactive = false;
      this.isinactive = true;
    }

  }
   
}
