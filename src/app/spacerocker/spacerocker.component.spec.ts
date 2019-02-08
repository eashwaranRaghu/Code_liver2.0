import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacerockerComponent } from './spacerocker.component';

describe('SpacerockerComponent', () => {
  let component: SpacerockerComponent;
  let fixture: ComponentFixture<SpacerockerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacerockerComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SpacerockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
