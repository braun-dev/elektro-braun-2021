import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimeReportComponent } from './create-time-report.component';

describe('CreateTimeReportComponent', () => {
  let component: CreateTimeReportComponent;
  let fixture: ComponentFixture<CreateTimeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTimeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
