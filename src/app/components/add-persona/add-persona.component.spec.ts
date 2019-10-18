import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonaComponent } from './add-persona.component';

describe('AddPersonaComponent', () => {
  let component: AddPersonaComponent;
  let fixture: ComponentFixture<AddPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
