import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let translateService: TranslateService
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterModule.forRoot([]),
        SidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    translateService = TestBed.inject(TranslateService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have menu items', () => {
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should render menu items', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(menuItems.length).toBe(component.menuItems.length);
  });

  it('should display correct menu item names', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    menuItems.forEach((item, index) => {
      const menuItem = component.menuItems[index];
      const nameElement = item.query(By.css('span')).nativeElement;
      expect(nameElement.textContent).toContain(menuItem.name);
    });
  });

  it('should display correct menu item icons', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    menuItems.forEach((item, index) => {
      const menuItem = component.menuItems[index];
      const iconElement = item.query(By.css('mat-icon')).nativeElement;
      expect(iconElement.textContent).toContain(menuItem.icon);
    });
  });
});
