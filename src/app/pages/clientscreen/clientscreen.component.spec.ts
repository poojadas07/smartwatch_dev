import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientscreenComponent } from './clientscreen.component';

describe('ClientscreenComponent', () => {
  let component: ClientscreenComponent;
  let fixture: ComponentFixture<ClientscreenComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
