import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { ApiserviceService } from './shared/apiservice.service';
import { ShareddataService } from './shared/shareddata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'emsfrontend';

constructor(private service: ShareddataService){
  

}
  ngOnInit(): void {
  
  }



}
