import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tpdb-admin-portal';
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de', 'nl']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|de|nl/) ? browserLang : 'en');
  }
}
