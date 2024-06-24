import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEditCongesComponent } from './ch-edit-conges.component';

describe('ChEditCongesComponent', () => {
  let component: ChEditCongesComponent;
  let fixture: ComponentFixture<ChEditCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEditCongesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEditCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
