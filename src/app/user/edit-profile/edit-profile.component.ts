import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Employee } from 'src/models/Employee';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  name:any;
  username:any;
  password:any;
  date:any;
  address:any;
  loading=false;


  editSubmit()
  {
    this.loading=true;
    let employee:Employee={name:this.name,username:this.username,joiningDate:this.date,address:this.address,password:this.password,id:0,role:localStorage.getItem("role")||"user"}
    this.service.updatemployee(employee).subscribe(data=>{
      this.getEmployeeData()
    })
  }
getEmployeeData()
{
  this.loading=true;
  this.service.getEmployeeByUsername().subscribe(data=>{
    this.address=data.address;
    this.name=data.name;
    this.username=data.username;
    this.date=moment(data.joiningDate).format("YYYY-MM-DD");
    this.loading=false;
    
  })
}

  onChange(event:Date)
  {

    this.date=moment(event).format("YYYY-MM-DD");
  }
  ngOnInit(): void {
    this.getEmployeeData();
  }

}
