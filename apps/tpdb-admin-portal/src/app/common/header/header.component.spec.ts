import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        FormsModule,
        HeaderComponent],
      providers: [
        {provide: Router, useValue: {navigate: jest.fn()}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    translateService = TestBed.inject(TranslateService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default language', () => {
    expect(component.currentLanguage).toBe('en');
    expect(component.selectedLanguage).toEqual({ name: 'English', icon: 'fi-gb' });
  });

  it('should change language', () => {
    component.useLanguage('de');
    expect(component.currentLanguage).toBe('de');
    expect(component.selectedLanguage).toEqual({ name: 'Deutch', icon: 'fi-de' });
  });

  it('should navigate to profile', () => {
    component.navToProfile();
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should log out', () => {
    console.log = jest.fn();
    component.logout();
    expect(console.log).toHaveBeenCalledWith('');
  });

  it('should handle unknown language gracefully', () => {
    component.useLanguage('fr');
    expect(component.currentLanguage).toBe('fr');
    expect(component.selectedLanguage).toEqual({ name: 'English', icon: 'fi-gb' });
  });
});
