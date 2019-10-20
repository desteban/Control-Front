import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateArticuloComponent } from './update-articulo.component';

describe('UpdateArticuloComponent', () => {
  let component: UpdateArticuloComponent;
  let fixture: ComponentFixture<UpdateArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
