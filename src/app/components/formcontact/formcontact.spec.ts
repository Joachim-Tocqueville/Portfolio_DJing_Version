import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Formcontact } from './formcontact';

describe('Formcontact', () => {
  let component: Formcontact;
  let fixture: ComponentFixture<Formcontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Formcontact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Formcontact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
