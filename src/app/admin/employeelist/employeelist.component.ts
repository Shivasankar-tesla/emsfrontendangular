import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
import { Employee } from 'src/models/Employee';
import { Pagination } from 'src/models/Pagination';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';





@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  listOfData: Employee[] = [];
  paginateBy:Pagination={pageNumber:0,pageSize:10,sortDirection:0,sortBy:"id"}
  totalElements:number=0;
  loading:boolean=false;
  currentPageNumber:number=1;
  pageSize:number=10
  employee:Employee={id: 0,name:"",joiningDate:"",username: "",address: "",role:"",password:""};
  title:string="Add Employee"
  isVisible = false;
  isVisibleDelete = false;
  isOkLoading = false;
  date:Date=new Date();
  isEnglish = false;
  role:string="";
  name:string=""
  username:string="";
  address:string="";
  password:string="";
  edit:boolean=false;
  id:number=0;

  showModal(): void {
    this.isVisible = true;
    this.resetFields();
  }

  onChange(result: Date): void {
    this.date=result;
   
  }

 

  deleteEmployee(id:number,role:string)
  {
    this.loading=true
    this.employee.id=id;
    this.employee.role=role;
 
    this.service.deleteEmployee(this.employee).subscribe(data=>{
     
      this.createBasicNotification("Employee Deleted SuccessFully");
      this.getEmployees(this.paginateBy);


    },err=>{
      this.createBasicNotification("Something Went Wrong");
      this.isVisible = false;
      this.isOkLoading = false;
    })

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

  handleEdit():void{
    debugger;
    this.isOkLoading = true;
    this.employee.role=this.role;
    this.employee.name=this.name;
    this.employee.username=this.username;
    this.employee.address=this.address;
    this.employee.id=this.id;
   // this.employee["isEnabled"]=true;
    const isEmpty = Object.values(this.employee).every(x => x === null || x === "" || x===0);
    if(!isEmpty)
    {
     
      this.employee.joiningDate=moment(this.date).format("YYYY-MM-DD");


      this.service.updatemployeeAdmin(this.employee).subscribe(data=>{
     
        this.createBasicNotification("Employee Edited SuccessFully");
        this.getEmployees(this.paginateBy);
        this.resetFields();
  
  
      },err=>{
        this.createBasicNotification("Something Went Wrong");
        this.isVisible = false;
        this.isOkLoading = false;
      })
    }

    else{
      this.createBasicNotification("All Fields Are Required");

    }

  }
  handleOk(): void {
    this.isOkLoading = true;
    this.employee.role=this.role;
    this.employee.name=this.name;
    this.employee.username=this.username;
    this.employee.address=this.address;
    this.employee.password=this.password;
   // this.employee["isEnabled"]=true;
    const isEmpty = Object.values(this.employee).every(x => x === null || x === "" || x===0);
    if(!isEmpty)
    {
     
      this.employee.joiningDate=moment(this.date).format("YYYY-MM-DD");


      this.service.addEmployee(this.employee).subscribe(data=>{
     
        this.createBasicNotification("Employee Added SuccessFully");
        this.getEmployees(this.paginateBy);
  
  
      },err=>{
        this.createBasicNotification("Something Went Wrong");
        this.isVisible = false;
        this.isOkLoading = false;
      })
    }

    else{
      this.createBasicNotification("All Fields Are Required");

    }
   
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  resetFields()
  {
    this.address="";
    this.name="";
    this.username="";
    this.date=new Date();
    this.role="";
    this.edit=false;
    
  }
  openEditPopup(data:Employee)
  {
    debugger;
    this.edit=true;
    this.isVisible=true;
    this.address=data.address;
    this.name=data.name;
    this.username=data.username;
    this.date=new Date(data.joiningDate);
    this.role=data.role;
    this.id=data.id;
  }
  
  constructor(private service:ApiserviceService,private notification: NzNotificationService) { }

  changeDate(timeStamp:string)
  {
   return moment(timeStamp).format('YYYY-MM-DD');;
  }
  getEmployees(paginateBy:Pagination)
  {
    this.loading=true;
    this.service.getEmployees(paginateBy).subscribe(data=>{
      this.currentPageNumber=data["pageable"].pageNumber+1;
      this.pageSize=data.size;
      this.listOfData=data["content"];
      this.totalElements=data["totalElements"]
      this.loading=false;
      this.isVisible = false;
      this.isOkLoading = false;
     
     
    

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
