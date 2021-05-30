import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Employee } from 'src/models/Employee';
import { Pagination } from 'src/models/Pagination';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Timesheet } from 'src/models/Timesheet';

@Component({
  selector: 'app-usertimesheet',
  templateUrl: './usertimesheet.component.html',
  styleUrls: ['./usertimesheet.component.css']
})
export class UsertimesheetComponent implements OnInit {

  

  listOfData: Timesheet[] = [];
  paginateBy:Pagination={pageNumber:0,pageSize:10,sortDirection:0,sortBy:"id"}
  totalElements:number=0;
  loading:boolean=false;
  currentPageNumber:number=1;
  pageSize:number=10
 
  isVisible = false;
  isOkLoading = false;
  date:Date=new Date();
  isEnglish = false;
  title="Make a TimeSheet Entry"
  logintime:any="";
  logouttime:any=""
  taskDone:any="";
 

  login(time:Date)
  {
    this.logintime=time.toTimeString().split(/[ ]+/)[0];
    console.log(this.logintime)
}


logout(time:Date)
{
  this.logouttime=time.toTimeString().split(/[ ]+/)[0];
  console.log(this.logintime)
}


  showModal(): void {
    this.isVisible = true;
  }

  onChange(result: Date): void {
    this.date=result;
   
  }

  
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

  handleOk(): void {
    this.isOkLoading = true;
    let timeSheet:Timesheet={taskDone:this.taskDone,loggedInTime:this.logintime,logoutTime:this.logouttime,entryDate:this.date};
    const isEmpty = Object.values(timeSheet).every(x => x === null || x.length==0 );
    debugger;
    if(!isEmpty)
    {
      this.service.addTimeSheet(timeSheet).subscribe(data=>{
        this.createBasicNotification("Timesheet Added");

        this.getTimesheets(this.paginateBy);
      },err=>{
        this.createBasicNotification("Something Went Wrong");
      })

    }
    else{
      this.createBasicNotification("All fields Are Required");
    }
   
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
  getTimesheets(paginateBy:Pagination)
  {

    this.loading=true;
    let token=localStorage.getItem("token");
    if(token)
    {
      this.service.getUserTimesheet(paginateBy).subscribe(data=>{
        this.currentPageNumber=data["pageable"].pageNumber+1;
        this.pageSize=data.size;
        this.listOfData=data["content"];
        this.totalElements=data["totalElements"]
        this.loading=false;
        this.isVisible = false;
        this.isOkLoading = false;
        
      
       
       
      
  
      })
    }
   
  }


  
  
  constructor(private service:ApiserviceService,private notification: NzNotificationService) { }

  changeDate(timeStamp:any)
  {
   return moment(timeStamp).format('YYYY-MM-DD');;
  }
 

 

  onCurrentPageSizeChange(event:number)
  {
   
    this.paginateBy.pageSize=event;
    this.getTimesheets(this.paginateBy);
  }

  pageChange(event:number)
  {
    if(event>0)
    {
      this.paginateBy.pageNumber=event-1;
    }
    else{
      this.paginateBy.pageNumber=event;
    }
    
    this.getTimesheets(this.paginateBy);
  }

  serverSideSorting(event:any,field:string)
  {
    
    let sortDirection = event==="ascend"? 0:1;
    this.paginateBy.sortDirection=sortDirection;
    this.paginateBy.sortBy=field;
    this.getTimesheets(this.paginateBy);  
  
  }



  ngOnInit(): void {
    this.getTimesheets(this.paginateBy);
  }
}
