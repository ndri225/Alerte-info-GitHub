import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChEditPermissionsComponent } from './ch-edit-permissions.component';

describe('ChEditPermissionsComponent', () => {
  let component: ChEditPermissionsComponent;
  let fixture: ComponentFixture<ChEditPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChEditPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChEditPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
