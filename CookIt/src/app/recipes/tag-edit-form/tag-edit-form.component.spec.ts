import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditFormComponent } from './tag-edit-form.component';

describe('TagEditFormComponent', () => {
  let component: TagEditFormComponent;
  let fixture: ComponentFixture<TagEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
