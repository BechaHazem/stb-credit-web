import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
    roles:['CLIENT','BANQUIER','ADMIN']
  },
  {
    navCap: 'Credit',
  },
  {
    displayName: 'Simuler un crédit',
    iconName: 'rosette',
    route: '/credit-simulation',
        roles:['CLIENT']
  },
    {
    displayName: 'Mes Simulations',
    iconName: 'poker-chip',
    route: '/simulations-history',
            roles:['CLIENT']
  },
  {
    displayName: 'Mes demandes',
    iconName: 'list',
    route: '/request-list',
        roles:['CLIENT']
  },
    {
    displayName: 'Liste des demandes',
    iconName: 'list',
    route: '/request-list',
        roles:['BANQUIER','ADMIN']
  },
    {
    displayName: 'Gérer les banquiers',
    iconName: 'building-bank',
    route: '/Banquier-details',
        roles:['ADMIN']
  },
      {
    displayName: 'Gérer les Produits',
    iconName: 'package',
    route: '/Products-details',
            roles:['ADMIN']
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  }
];
