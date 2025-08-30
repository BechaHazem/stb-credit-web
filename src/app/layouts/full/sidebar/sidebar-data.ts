import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Credit',
  },
  {
    displayName: 'Simuler un crédit',
    iconName: 'rosette',
    route: '/credit-simulation',
  },
    {
    displayName: 'Mes Simulations',
    iconName: 'poker-chip',
    route: '/simulations-history',
  },
  {
    displayName: 'Mes demandes',
    iconName: 'list',
    route: '/request-list',
  },
    {
    displayName: 'Gérer les banquiers',
    iconName: 'building-bank',
    route: '/Banquier-details',
  },
      {
    displayName: 'Gérer les Produits',
    iconName: 'package',
    route: '/Products-details',
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
