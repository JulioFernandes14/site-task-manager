import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBasicDemoComponent } from './chart-basic-demo.component';

describe('ChartBasicDemoComponent', () => {
  let component: ChartBasicDemoComponent;
  let fixture: ComponentFixture<ChartBasicDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartBasicDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBasicDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
