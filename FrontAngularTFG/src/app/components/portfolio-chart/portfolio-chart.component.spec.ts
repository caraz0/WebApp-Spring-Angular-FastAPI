import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioChartComponent } from './portfolio-chart.component';

describe('PortfolioChartComponent', () => {
  let component: PortfolioChartComponent;
  let fixture: ComponentFixture<PortfolioChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
