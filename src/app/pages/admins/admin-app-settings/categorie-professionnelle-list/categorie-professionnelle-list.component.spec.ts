import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieProfessionnelleListComponent } from './categorie-professionnelle-list.component';

describe('CategorieProfessionnelleListComponent', () => {
  let component: CategorieProfessionnelleListComponent;
  let fixture: ComponentFixture<CategorieProfessionnelleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieProfessionnelleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorieProfessionnelleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
