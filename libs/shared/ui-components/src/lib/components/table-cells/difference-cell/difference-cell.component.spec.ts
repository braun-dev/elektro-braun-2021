import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferenceCellComponent } from './difference-cell.component';

describe('DifferenceCellComponent', () => {
  let component: DifferenceCellComponent;
  let fixture: ComponentFixture<DifferenceCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifferenceCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferenceCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
