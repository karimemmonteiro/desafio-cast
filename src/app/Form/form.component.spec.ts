import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameEditorComponent } from './form.component';

describe('ModalComponent', () => {
  let component: NameEditorComponent;
  let fixture: ComponentFixture<NameEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NameEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
