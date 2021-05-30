import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Employee } from 'src/models/Employee';
import { Pagination } from 'src/models/Pagination';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Timesheet } from 'src/models/Timesheet';
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

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

 

  
  
  constructor(private service:ApiserviceService,private notification: NzNotificationService) { }

  changeDate(timeStamp:string)
  {
   return moment(timeStamp).format('YYYY-MM-DD');;
  }
  getTimesheets(paginateBy:Pagination)
  {
    this.loading=true;
    this.service.getTimesheets(paginateBy).subscribe(data=>{
      this.currentPageNumber=data["pageable"].pageNumber+1;
      this.pageSize=data.size;
      this.listOfData=data["content"];
      this.totalElements=data["totalElements"]
      this.loading=false;
      this.isVisible = false;
      this.isOkLoading = false;
     
     
    

    })
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
