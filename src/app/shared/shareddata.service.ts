import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ShareddataService {

  public dataObsevable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentData=this.dataObsevable.asObservable();
  constructor() { } 
  onDataReceived = (close: boolean) => 
  {
    this.dataObsevable.next(close)
  }
   
  
}
