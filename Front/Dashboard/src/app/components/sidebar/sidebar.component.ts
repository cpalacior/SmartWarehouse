import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Panel general', icon: 'business_chart-pie-36', class: '' },
  { path: '/user-profile', title: 'Perfil de usuario', icon: 'users_single-02', class: '' },
  { path: '/sections', title: 'Secciones', icon: 'design_app', class: '' },
  { path: '/slots', title: 'Estanterias', icon: 'design_bullet-list-67', class: '' },
  { path: '/batch', title: 'Lotes', icon: 'shopping_tag-content', class: '' },
  { path: '/storage', title: 'Inventario', icon: 'education_paper', class: '' },
  { path: '/notifications', title: 'Notificaciones', icon: 'travel_info', class: '' },
  /* { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' }, */


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
}
