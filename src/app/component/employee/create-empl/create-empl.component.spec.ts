import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmplComponent } from './create-empl.component';

describe('CreateEmplComponent', () => {
  let component: CreateEmplComponent;
  let fixture: ComponentFixture<CreateEmplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmplComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
