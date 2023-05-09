import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplieComponent } from './replie.component';

describe('ReplieComponent', () => {
  let component: ReplieComponent;
  let fixture: ComponentFixture<ReplieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReplieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
