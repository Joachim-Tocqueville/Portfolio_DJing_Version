import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Testdrag } from './testdrag';

describe('Testdrag', () => {
  let component: Testdrag;
  let fixture: ComponentFixture<Testdrag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Testdrag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Testdrag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
