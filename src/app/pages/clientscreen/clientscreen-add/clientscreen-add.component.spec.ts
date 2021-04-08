import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientscreenAddComponent } from './clientscreen-add.component';

describe('ClientscreenAddComponent', () => {
  let component: ClientscreenAddComponent;
  let fixture: ComponentFixture<ClientscreenAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientscreenAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientscreenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
