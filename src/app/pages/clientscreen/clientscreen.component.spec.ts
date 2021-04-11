<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
>>>>>>> f9384285f47de0c46bc903b07c3d2a9a443c9cb3

import { ClientscreenComponent } from './clientscreen.component';

describe('ClientscreenComponent', () => {
  let component: ClientscreenComponent;
  let fixture: ComponentFixture<ClientscreenComponent>;

<<<<<<< HEAD
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientscreenComponent ]
    })
    .compileComponents();
  }));
=======
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientscreenComponent ]
    })
    .compileComponents();
  });
>>>>>>> f9384285f47de0c46bc903b07c3d2a9a443c9cb3

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
