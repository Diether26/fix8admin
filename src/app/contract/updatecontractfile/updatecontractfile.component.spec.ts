import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecontractfileComponent } from './updatecontractfile.component';

describe('UpdatecontractfileComponent', () => {
  let component: UpdatecontractfileComponent;
  let fixture: ComponentFixture<UpdatecontractfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatecontractfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecontractfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
