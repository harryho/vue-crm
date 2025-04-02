import {
  CircleIcon,
  WindmillIcon,
  TypographyIcon,
  ShadowIcon,
  PaletteIcon,
  KeyIcon,
  BugIcon,
  DashboardIcon,
  BrandChromeIcon,
Stack3Icon,
  UsersIcon,
  HelpIcon,
  TruckDeliveryIcon,
  ArticleIcon,
  TemplateIcon,
  UserDollarIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Home' },
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    to: '/dashboard'
  },
  {
    title: 'Customer',
    icon: UsersIcon,
    to: '/customer'
  },
  {
    title: 'Product',
    icon: Stack3Icon,
    to: '/product'
  },
  {
    title: 'Order',
    icon: TruckDeliveryIcon,
    to: '/order'
  },
  { divider: true },
  { header: 'Marketing' }
  ,
  {
    title: 'Blog',
    icon: TemplateIcon,
    to: '/blog'
  },
  
  // { divider: true },
  // { header: 'Utilities' },
  // {
  //   title: 'Typography',
  //   icon: TypographyIcon,
  //   to: '/utils/typography'
  // },
  // {
  //   title: 'Shadows',
  //   icon: ShadowIcon,
  //   to: '/utils/shadows'
  // },
  // {
  //   title: 'Colors',
  //   icon: PaletteIcon,
  //   to: '/utils/colors'
  // },

  // {
  //   title: 'Icons',
  //   icon: WindmillIcon,
  //   to: '/forms/radio',
  //   children: [
  //     {
  //       title: 'Tabler Icons',
  //       icon: CircleIcon,
  //       to: '/icons/tabler'
  //     },
  //     {
  //       title: 'Material Icons',
  //       icon: CircleIcon,
  //       to: '/icons/material'
  //     }
  //   ]
  // }
];

export default sidebarItem;
