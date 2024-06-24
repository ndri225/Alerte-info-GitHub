import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChDetailCongesComponent } from './ch-detail-conges.component';

describe('ChDetailCongesComponent', () => {
  let component: ChDetailCongesComponent;
  let fixture: ComponentFixture<ChDetailCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChDetailCongesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChDetailCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
