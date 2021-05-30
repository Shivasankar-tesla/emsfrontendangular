import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../shared/apiservice.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import decode from 'jwt-decode';
import { ShareddataService } from '../shared/shareddata.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  loading=false;


  createBasicNotification(message:string): void {
    this.notification
      .blank(
        'Error',
        message
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }



  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  
    this.loading=true;
    this.service.login(this.validateForm.get("userName")?.value,this.validateForm.get("password")?.value).subscribe(data=>{
      if(data.token)
      {  
        // checking if the token is present
        // saving the token inside  localstorage
        const tokenPayload:any = decode(data.token);
        console.log(tokenPayload);
        let role=(tokenPayload["role"]);
   
        localStorage.setItem('token', data.token);
        localStorage.setItem('role',role);
   
        this.loading=false;
   
        
     
          if(role=="admin")
          {
           this.router.navigate(['/admin/employees']);
           this.sharedService.onDataReceived(true);
          }
         else if(role=="user")
         {
           this.router.navigate(['/user/timesheet']);
           this.sharedService.onDataReceived(true);
         }
         
          //console.log("executed",data.role);
        
   
       
      }
   
      
    },err=>{
      this.createBasicNotification('Wrong Username Or Password');
      this.loading=false;


    })
  }

  constructor(private fb: FormBuilder,private notification: NzNotificationService,private service:ApiserviceService,private route: ActivatedRoute, private router: Router,private sharedService:ShareddataService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
