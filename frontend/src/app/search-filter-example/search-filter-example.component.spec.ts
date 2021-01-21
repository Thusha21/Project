import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterExampleComponent } from './search-filter-example.component';

describe('SearchFilterExampleComponent', () => {
  let component: SearchFilterExampleComponent;
  let fixture: ComponentFixture<SearchFilterExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFilterExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
