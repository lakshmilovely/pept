import { Component } from '@angular/core';
import { ApiService } from './Core/_providers/api-service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'devspyhre';
  constructor(private service: ApiService){}
  click(e)
  {
 
    
     this.service.setSideMenuClose({data : e , val : 1})
  }
}
