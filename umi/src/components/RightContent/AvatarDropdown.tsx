import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback } from 'react';

export type GlobalHeaderRightProps = {
  children?: React.ReactNode;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const menuItems = [
    {
      key: 'center',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const onMenuClik = useCallback((event: MenuInfo) => {
    console.log(event);
  }, []);
  return (
    <Dropdown
      menu={{
        selectedKeys: [],
        items: menuItems,
        onClick: onMenuClik,
      }}
      placement="top"
      overlayStyle={{ paddingBottom: 5 }}
    >
      {children}
    </Dropdown>
  );
};

export default AvatarDropdown;
