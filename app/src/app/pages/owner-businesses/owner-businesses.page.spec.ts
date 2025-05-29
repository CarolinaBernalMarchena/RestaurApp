import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwnerBusinessesPage } from './owner-businesses.page';

describe('OwnerBusinessesPage', () => {
  let component: OwnerBusinessesPage;
  let fixture: ComponentFixture<OwnerBusinessesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerBusinessesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
