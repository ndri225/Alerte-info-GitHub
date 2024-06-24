import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCongesListComponent } from './type-conges-list.component';

describe('TypeCongesListComponent', () => {
  let component: TypeCongesListComponent;
  let fixture: ComponentFixture<TypeCongesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeCongesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeCongesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
