import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePrescriptionComponent } from './create-update-prescription.component';

describe('CreateUpdatePrescriptionComponent', () => {
  let component: CreateUpdatePrescriptionComponent;
  let fixture: ComponentFixture<CreateUpdatePrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePrescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
