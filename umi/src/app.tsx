// 运行时配置
import Footer from '@/components/Footers';
import { Wechat } from '@/components/RightContent';
import { GithubAction } from '@/components/RightContent/ActionsRender';
import AvatarDropdown from '@/components/RightContent/AvatarDropdown';
import { AlipayCircleFilled, GitlabFilled } from '@ant-design/icons';
import {
  Settings as LayoutSettings,
  SettingDrawer,
} from '@ant-design/pro-components';
import { RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import './global.less';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  name: string;
  settings?: Partial<LayoutSettings>;
}> {
  return {
    name: '@umijs/max',
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    menu: {
      locale: false,
    },
    //设置头像和登入名称
    avatarProps: {
      src: 'https://srb-file-prw.oss-cn-shenzhen.aliyuncs.com/manager-admin/2023-04-17/e30400c0ce3f4c2d97dba414322fd08b096018eb6d6fa8ef3d1b23f7e018b249.jpeg',
      title: 'admin',
      render: (_: any, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },

    // 设置显示图标
    actionsRender: () => [
      <GithubAction key="github" />,
      <GitlabFilled key="gitlabFilled" />,
      <Wechat key="wechatFilled" />,
      <AlipayCircleFilled key="alipayCircleFilled" />,
    ],
    // 设置页脚
    footerRender: () => <Footer />,
    // 配置默认setting 属性
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};
