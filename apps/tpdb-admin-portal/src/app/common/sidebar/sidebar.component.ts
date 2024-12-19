import { Component } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


export interface MenuItem {
  name: string;
  icon: string;
  route: string;
  children? : MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatNavList,
    MatListItem,
    MatIcon,
    RouterLink,
    TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: MenuItem[] = [];
  constructor() {
    this.menuItems = [
      { name: 'sidemenu.home', icon: 'home', route: 'home' },
      { name: 'sidemenu.dashboard', icon: 'dashboard', route: 'dashboard' },
      // { name: 'Resort', icon: 'menu', route: 'resort' },
      // { name: 'Park', icon: 'profile', route: 'profile' },
      // { name: 'Ride', icon: 'profile', route: 'profile' },
      // { name: 'Restaurant', icon: 'profile', route: 'profile' },
      // { name: 'Hotel', icon: 'profile', route: 'profile' },
      // { name: 'Settings', icon: 'settings', route: 'settings' },
      // { name: 'Logout', icon: 'logout', route: 'logout' }
    ];
  }
}
