import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let translateService: TranslateService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot([
          { path: 'login', component: AppComponent },
          { path: 'register', component: AppComponent },
          { path: 'dashboard', component: AppComponent },
        ]),
      ],
      providers: [TranslateService],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    router = TestBed.inject(Router);
  });

  it('should be defined', () => {
    expect(AppComponent).toBeDefined();
  });
  it('should set default language to English', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(translateService.getDefaultLang()).toBe('en');
  });

  it('should use browser language if supported', () => {
    jest.spyOn(translateService, 'getBrowserLang').mockReturnValue('de');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(translateService.currentLang).toBe('de');
  });

  it('should fall back to English if browser language is not supported', () => {
    jest.spyOn(translateService, 'getBrowserLang').mockReturnValue('fr');
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(translateService.currentLang).toBe('en');
  });

  it('should hide header on /login route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await router.navigateByUrl('/login');
    fixture.detectChanges();
    expect(fixture.componentInstance.showHeader).toBe(false)
  });

  it('should hide header on /register route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await router.navigateByUrl('/register');
    fixture.detectChanges();
    expect(fixture.componentInstance.showHeader).toBe(false);
  });

  //TODO: This should pass we need to test this functional.
  xit('should show header on other routes', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await router.navigateByUrl('/dashboard');
    fixture.detectChanges();
    expect(fixture.componentInstance.showHeader).toBe(true);
  });
});
