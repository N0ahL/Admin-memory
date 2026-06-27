import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApis } from './admin-apis';

describe('AdminApis', () => {
  let component: AdminApis;
  let fixture: ComponentFixture<AdminApis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminApis],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminApis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
