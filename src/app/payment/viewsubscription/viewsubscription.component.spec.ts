import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsubscriptionComponent } from './viewsubscription.component';

describe('ViewsubscriptionComponent', () => {
  let component: ViewsubscriptionComponent;
  let fixture: ComponentFixture<ViewsubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
