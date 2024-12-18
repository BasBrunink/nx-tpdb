import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatToolbar, MatIcon, MatIconButton, MatSelect, MatOption, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  languageMap = new Map<string, Language>([
    ['en', {name: 'English', icon: 'fi-gb'}],
    ['de', {name: 'Deutch', icon: 'fi-de'}],
    ['nl', {name: 'Nederlands', icon: 'fi-nl'}],
  ]);

  currentLanguage: string;
  selectedLanguage: Language;

  @Output() toggleSideNav = new EventEmitter<any>

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    this.currentLanguage = this.translate.currentLang || 'en';
    this.selectedLanguage = this.languageMap.get(this.currentLanguage) as Language;
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
    this.selectedLanguage = this.languageMap.get(language) as Language;
  }

  navToProfile() {
    this.router.navigate(['/profile'])
  }
  logout() {
    console.log('')
  }

}

export interface Language {
  name: string;
  icon: string;

}
