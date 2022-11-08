import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePatientComponent } from './create-update-patient.component';

describe('CreateUpdatePatientComponent', () => {
  let component: CreateUpdatePatientComponent;
  let fixture: ComponentFixture<CreateUpdatePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
