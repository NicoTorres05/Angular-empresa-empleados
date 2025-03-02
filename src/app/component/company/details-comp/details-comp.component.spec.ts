import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCompComponent } from './details-comp.component';

describe('DetailsCompComponent', () => {
  let component: DetailsCompComponent;
  let fixture: ComponentFixture<DetailsCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
