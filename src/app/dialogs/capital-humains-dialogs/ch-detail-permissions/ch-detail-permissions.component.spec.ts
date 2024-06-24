import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChDetailPermissionsComponent } from './ch-detail-permissions.component';

describe('ChDetailPermissionsComponent', () => {
  let component: ChDetailPermissionsComponent;
  let fixture: ComponentFixture<ChDetailPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChDetailPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChDetailPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
