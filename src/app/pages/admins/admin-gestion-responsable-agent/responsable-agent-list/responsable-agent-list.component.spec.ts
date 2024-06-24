import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsableAgentListComponent } from './ResponsableAgentListComponent';

describe('ResponsableAgentListComponent', () => {
  let component: ResponsableAgentListComponent;
  let fixture: ComponentFixture<ResponsableAgentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsableAgentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsableAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
