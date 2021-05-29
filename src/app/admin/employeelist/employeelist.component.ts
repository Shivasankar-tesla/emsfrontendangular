import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Employee } from 'src/models/Employee';
import { Pagination } from 'src/models/Pagination';






@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  listOfData: Employee[] = [];
  paginateBy:Pagination={pageNumber:0,pageSize:10,sortDirection:1,sortBy:"id"}
  totalElements:number=0;
  loading:boolean=false;
  currentPageNumber:number=1;
  pageSize:number=10
  employee:Employee={id: 0,name:"",joiningDate:"",username: "",address: "",role:""};
  
  constructor(private service:ApiserviceService) { }

  getEmployees(paginateBy:Pagination)
  {
    this.loading=true;
    this.service.getEmployees(paginateBy).subscribe(data=>{
      this.currentPageNumber=data["pageable"].pageNumber+1;
      this.pageSize=data.size;
      this.listOfData=data["content"];
      this.totalElements=data["totalElements"]
      this.loading=false;
     
     
    

    })
  }

  filter = [
    { text: 'id', value: "id" },
   
  ];

  onCurrentPageSizeChange(event:number)
  {
   
    this.paginateBy.pageSize=event;
    this.getEmployees(this.paginateBy);
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
    
    this.getEmployees(this.paginateBy);
  }

  serverSideSorting(event:any,field:string)
  {
    
    let sortDirection = event==="ascend"? 0:1;
    this.paginateBy.sortDirection=sortDirection;
    this.paginateBy.sortBy=field;
    this.getEmployees(this.paginateBy);  
  
  }

  serverSideFiltering(event:any)
  {
    this.loading=true;
    this.employee.name=event.target.value;
    this.employee.username=event.target.value;
    this.employee.address=event.target.value;
    this.employee.role=event.target.value;
    this.service.getEmployeesByFilter(this.paginateBy,this.employee).subscribe(data=>{
      this.currentPageNumber=data["pageable"].pageNumber+1;
      this.pageSize=data.size;
      this.listOfData=data["content"];
      this.totalElements=data["totalElements"]
      this.loading=false;

    })
    console.log(event.target.value);
   
  }

  ngOnInit(): void {
    this.getEmployees(this.paginateBy);
  }

}
