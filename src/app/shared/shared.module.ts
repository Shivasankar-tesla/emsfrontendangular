import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzFormModule,
    NzButtonModule ,
    NzDividerModule
  ],
  
  exports: [
    NzFormModule,
    NzInputModule,
    FormsModule, ReactiveFormsModule,
    NzButtonModule ,
    NzDividerModule
  ]
})
export class SharedModule { }
