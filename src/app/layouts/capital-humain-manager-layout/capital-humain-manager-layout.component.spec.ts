import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalHumainManagerLayoutComponent } from './capital-humain-manager-layout.component';

describe('CapitalHumainManagerLayoutComponent', () => {
  let component: CapitalHumainManagerLayoutComponent;
  let fixture: ComponentFixture<CapitalHumainManagerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapitalHumainManagerLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CapitalHumainManagerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
