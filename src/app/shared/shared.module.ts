import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ApiserviceService } from './apiservice.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NavbarComponent } from '../navbar/navbar.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzFormModule,
    NzButtonModule ,
    NzDividerModule,
    NzNotificationModule
 
  ],
  providers:[
 ApiserviceService
  ],
  
  exports: [
    NzFormModule,
    NzInputModule,
    FormsModule, ReactiveFormsModule,
    NzButtonModule ,
    NzDividerModule,
    NzNotificationModule,
    NzTableModule,
    NzIconModule,
    NzSpinModule,
    NzPaginationModule,
    NzModalModule,
    NzDatePickerModule,
    NzSelectModule,
    NzMenuModule,
    NzTimePickerModule

    
  ]
})
export class SharedModule { }
