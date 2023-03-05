import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesCatalogComponent } from './favorites-catalog.component';

describe('FavoritesCatalogComponent', () => {
  let component: FavoritesCatalogComponent;
  let fixture: ComponentFixture<FavoritesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
