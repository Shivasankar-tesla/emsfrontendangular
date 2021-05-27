import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserleaveComponent } from './userleave.component';

describe('UserleaveComponent', () => {
  let component: UserleaveComponent;
  let fixture: ComponentFixture<UserleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserleaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
