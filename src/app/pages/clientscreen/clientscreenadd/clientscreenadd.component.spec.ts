import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientscreenaddComponent } from './clientscreenadd.component';

describe('ClientscreenaddComponent', () => {
  let component: ClientscreenaddComponent;
  let fixture: ComponentFixture<ClientscreenaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientscreenaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientscreenaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
