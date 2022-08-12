import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {
  public response: any = [];
  public moduleData: any = [];
  designationData: any = [];
  uid: any = [];
  pid: any = [];
  roleId: any;
  Obj: any;
  employeedesignation: any;
  constructor(private apiSrvc: ApiService, public router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    let obj = {
      "Id": "",
      "Expression": ""
    }
    this.apiSrvc.postmethod('designations/get', obj).subscribe(res => {
      console.log(res);
      this.designationData = res.response;
      console.log('designationData', this.designationData)
    })

    this.apiSrvc.getdata().subscribe(data => {
      this.roleId = data;
      console.log("Desg Resp--->", this.roleId);
      this.employeedesignation = this.roleId;
      this.OnSelectDesignation();
    })
  }

  OnSelectDesignation() {
    // console.log("Event Val--->", e);
    this.spinner.show();
    this.Obj = {
      "RoleID": this.employeedesignation,
      "expression": "mod_active='Y'"
    }
    this.apiSrvc.postmethod('permissionsbasedonroles/get', this.Obj).subscribe(res => {
      this.response = res.response
      console.log('Modules Resp--->', this.response);
      this.moduleData = this.response
      this.spinner.hide();
      // for (let i = 0; i < this.moduleData.length; i++) {
      //   this.moduleData[i].MOD_ACTIVE = "N"
      // }
      this.pid = []; this.uid = [];
      this.moduleData.forEach(el => {
        if (el.status == "Y" && el.MOD_ID != "0") {
          this.pid.push(el.MOD_ID.toString());
        }
        if (el.status == "Y" && el.MOD_ID == "0") {
          this.uid.push(el.SMOD_ID.toString());
        }
      })

    })

  }

  checkModule(id, event) {
    console.log('Mail Check', id)
    if (event.target.checked) {
      for (let i = 0; i < this.moduleData.length; i++) {
        if (id.MOD_ID == this.moduleData[i].SMOD_M_ID) {
          id.status = "Y";
          this.moduleData[i].status = "Y";
          console.log(this.moduleData[i]);
        }
      }
    }
    else {
      for (let i = 0; i < this.moduleData.length; i++) {
        if (id.MOD_ID == this.moduleData[i].SMOD_M_ID) {
          id.status = "N";
          this.moduleData[i].status = "N";
        }
      }
    }

    //console.log('Chck Module',this.moduleData)
  }

  checkSubmodule(id, main, evnt) {
    let arry1: any = [];
    console.log(main);

    if (evnt.target.checked) {
      for (let i = 0; i < this.moduleData.length; i++) {
        if (id.SMOD_M_ID == this.moduleData[i].MOD_ID) {
          id.status = "Y";
          this.moduleData[i].status = "Y";
          break;
        }
      }
    } else {
      for (let i = 0; i < this.moduleData.length; i++) {
        if (main.MOD_ID == this.moduleData[i].SMOD_M_ID) {
          //this.moduleData[i].status = 'N';
          arry1.push(this.moduleData[i]);
          id.status = "N";
          // break;
        }
      }
      const allEqual = arr => arr.every(val => val.status === "N");
      const result = allEqual(arry1);
      result == true ? main.status = "N" : main.status = "Y"
      if (main.status == "N") {
        this.pid.forEach((e, index) => {
          if (e == main.MOD_ID) {
            this.pid.splice(index, 1)
          }
        })
      }
    }
  }

  saveRolePermisssions() {
    console.log('update Obj', this.moduleData);
    this.pid = []; this.uid = [];
    this.moduleData.forEach(el => {
      if (el.status == "Y" && el.MOD_ID != "0") {
        this.pid.push(el.MOD_ID.toString());
      }
      if (el.status == "Y" && el.MOD_ID == "0") {
        this.uid.push(el.SMOD_ID.toString());
      }
    })
    if (this.uid.length > 0 || this.pid.length > 0) {
      const obj = {
        "SP_ROLE_ID": this.roleId,
        "SP_SMOD_ID": this.uid.join(","),
        "SP_MOD_ID": this.pid.join(",")
      }
      console.log('update Obj', obj);

      this.apiSrvc.putmethod('permissionsbasedonroles', obj).subscribe((data: any) => {
        console.log(data);
        if (data.status == 200) {
          alertify.success(data.response)
          this.router.navigate(['designations']);
        }
      }, err => {
        alertify.error("Modules don't not added!!");
      })

    } else {
      alertify.error("Please select modules");
    }
  }
  canceldesignationEdit() {
    this.router.navigate(['designations']);
  }

}
