import { ComponentFixture, TestBed } from '@angular/core/testing';

import { formComponent } from './form.component';

describe('ModalComponent', () => {
  let component: formComponent;
  let fixture: ComponentFixture<formComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [formComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(formComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
