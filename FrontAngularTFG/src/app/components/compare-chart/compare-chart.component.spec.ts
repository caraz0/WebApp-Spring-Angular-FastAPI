import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareChartComponent } from './compare-chart.component';

describe('CompareChartComponent', () => {
  let component: CompareChartComponent;
  let fixture: ComponentFixture<CompareChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompareChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompareChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
