import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisADisponibiliteComponent } from './mis-a-disponibilite.component';

describe('MisADisponibiliteComponent', () => {
  let component: MisADisponibiliteComponent;
  let fixture: ComponentFixture<MisADisponibiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisADisponibiliteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MisADisponibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
