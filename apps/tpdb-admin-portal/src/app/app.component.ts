import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './common/header/header.component';
import { MatSidenavContainer, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './common/sidebar/sidebar.component';


@Component({
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    HeaderComponent,
    MatSidenavModule,
    SidebarComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'tpdb-admin-portal';

  showHeader = false;
  constructor(private router: Router, public translate: TranslateService) {
    translate.addLangs(['en', 'de', 'nl']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|de|nl/) ? browserLang : 'en');
  }
  ngOnInit() {
    this.router.events
      .forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] === '/login' || event['url'] === '/register') {
            this.showHeader = false;
          } else {
            this.showHeader = true;
          }
        }
      })
      .then();
  }
}
