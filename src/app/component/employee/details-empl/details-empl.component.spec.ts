import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEmplComponent } from './details-empl.component';

describe('DetailsEmplComponent', () => {
  let component: DetailsEmplComponent;
  let fixture: ComponentFixture<DetailsEmplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsEmplComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
