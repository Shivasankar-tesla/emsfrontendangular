import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pagination } from 'src/models/Pagination';
import { Employee } from 'src/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  constructor(private http:HttpClient,private jwtHelper:JwtHelperService) { }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || "token";
    return !this.jwtHelper.isTokenExpired(token);
  }

  login (username:string,password:string):Observable<any>
{
  return this.http.post(`http://${environment.url}:${environment.port}/authenticate/signIn`,{userName:username,password:password});
}

getEmployees(paginateBy:Pagination):Observable<any>

{
  return this.http.post(`http://${environment.url}:${environment.port}/admin/employeeList`,paginateBy);

}

getEmployeesByFilter(paginateBy:Pagination,user:Employee):Observable<any>

{
  return this.http.post(`http://${environment.url}:${environment.port}/admin/employeeListFilter`,{...paginateBy,...user});

}

addEmployee(employee:Employee):Observable<any>
{
  return this.http.post(`http://${environment.url}:${environment.port}/admin/createEmployee`,employee);

}
deleteEmployee(employee:Employee):Observable<any>
{
  return this.http.post(`http://${environment.url}:${environment.port}/admin/deleteEmployee`,employee);

}
}
