import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallLogDetailsComponent } from './call-log-details.component';

describe('CallLogDetailsComponent', () => {
  let component: CallLogDetailsComponent;
  let fixture: ComponentFixture<CallLogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallLogDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
