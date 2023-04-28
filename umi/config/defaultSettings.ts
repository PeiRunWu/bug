import { ProLayoutProps } from '@ant-design/pro-layout';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Manager-admin',
  pwa: false,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  token: {
    bgLayout: '#F0F2F5',
    sider: {
      colorMenuBackground: '#fff',
      colorMenuItemDivider: '#dfdfdf',
      colorTextMenu: '#595959',
      colorTextMenuSelected: 'rgba(42,122,251,1)',
      colorBgMenuItemSelected: 'rgba(230,243,254,1)',
    },
  },
};

export default Settings;
