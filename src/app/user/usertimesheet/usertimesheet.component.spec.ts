import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertimesheetComponent } from './usertimesheet.component';

describe('UsertimesheetComponent', () => {
  let component: UsertimesheetComponent;
  let fixture: ComponentFixture<UsertimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
