import { deleteSysUserById } from '@/services/system/sysUserService';
import {
  DeleteOutlined,
  EditOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { Button, Modal, Popconfirm, Space, Tooltip } from 'antd';
import React, { FC, useState } from 'react';
import EditSysUserPage from './EditSysUserPage';

interface Props {
  id: string;
  username: string;
  onRefresh: () => void;
}

const UserActionButtons: FC<Props> = React.memo(
  ({ id, username, onRefresh }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAssisgnRole, setIsAssisgnRole] = useState(false);

    const handleDelete = async () => {
      const response = await deleteSysUserById(id);
      if (response.code === 200) {
        onRefresh();
      }
    };

    const handleEdit = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleEditSuccess = () => {
      console.log('执行刷新');
      onRefresh();
      setIsModalVisible(false);
    };

    //   const handleAssignSuccess = () => {
    //     setIsAssisgnRole(false);
    //   };

    const handleAssign = () => {
      setIsAssisgnRole(true);
    };

    const handleAssignCancel = () => {
      setIsAssisgnRole(false);
    };

    return (
      <Space>
        <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} />

        <Popconfirm
          title="删除数据"
          description="请问是否需要删除该数据?"
          okText="确定"
          cancelText="取消"
          placement="top"
          onConfirm={handleDelete}
        >
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>

        <Tooltip title="分配角色">
          <Button
            type="primary"
            icon={<UserSwitchOutlined />}
            style={{ backgroundColor: '#E6A23C' }}
            onClick={handleAssign}
          />
        </Tooltip>

        <Modal
          title="分配角色"
          open={isAssisgnRole}
          onCancel={handleAssignCancel}
          footer={null}
        >
          {/* <AssignRoles id={id} onSuccess={handleAssignSuccess} username={username} /> */}
        </Modal>

        <Modal
          title="编辑用户信息"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <EditSysUserPage id={id} onSuccess={handleEditSuccess} />
        </Modal>
      </Space>
    );
  },
);

export default UserActionButtons;
