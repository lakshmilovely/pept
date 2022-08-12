import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'

const headersData = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  sideMenu = new BehaviorSubject({
    obj: ''
  });

  private userDataId = new BehaviorSubject({
    obj: ""
  })

  constructor(private http: HttpClient) { }


  loggedIn() {
    return !!sessionStorage.getItem("SeesionUser");
  }
  private httpOption() {

    let httpOptions: any;

    // console.log('this.token',this.token);

    return httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        // 'x-access-token':this.token,
      })
    }
  }
  postmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          console.log(res);
          return res;
        }));
  }


  putmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.put(`${environment.apiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }

  deletemethod(endpoint: string, obj: object): Observable<any> {
    return this.http.request('delete', `${environment.apiUrl}${endpoint}`, { body: obj })
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }
  deletee(id) {
    return this.http.request('delete', `${environment.apiUrl}vacationsrequest`, { body: id });
  }
  deleteusers(id) {
    return this.http.request('delete', `${environment.apiUrl}users`, { body: id });
  }
  setdata(data: any) {
    this.userDataId.next(data);
  }

  getdata() {
    return this.userDataId.asObservable()
  }

  postusers(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
          return res;
        }));
  }

  setSideMenuClose(val) {
    this.sideMenu.next(val)

  }

  getSideMenu() {

    return this.sideMenu.asObservable();
  }




}
