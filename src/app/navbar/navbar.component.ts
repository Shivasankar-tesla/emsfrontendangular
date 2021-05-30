import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../shared/apiservice.service';
import { ShareddataService } from '../shared/shareddata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private service:ApiserviceService,private serviceShared:ShareddataService) { }
  isAuthenticated=false;
  role:any=null;

  logout()
{
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  this.isAuthenticated=false;
  this.router.navigate(["/"]);
}
onDataChangeReceived = () => {
  
}
  ngOnInit(): void {

    
      this.isAuthenticated=this.service.isAuthenticated();
      if(this.isAuthenticated)
      {
        this.role=localStorage.getItem("role");
        
      }

      this.serviceShared.currentData.subscribe(data=>{
        if(data)
        {
        this.isAuthenticated=true;
        }
   
      
      })
  

  }
}
