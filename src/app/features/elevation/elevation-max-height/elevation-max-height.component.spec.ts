import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevationMaxHeightComponent } from './elevation-max-height.component';

describe('ElevationMaxHeightComponent', () => {
  let component: ElevationMaxHeightComponent;
  let fixture: ComponentFixture<ElevationMaxHeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevationMaxHeightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElevationMaxHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
