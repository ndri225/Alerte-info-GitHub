import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionsListComponent } from './fonctions-list.component';

describe('FonctionsListComponent', () => {
  let component: FonctionsListComponent;
  let fixture: ComponentFixture<FonctionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FonctionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
