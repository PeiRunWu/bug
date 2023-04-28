import { SysUserType } from '@/models/system/sysUser';
import { getSysUserList } from '@/services/system/sysUserService';
import {
  ActionType,
  PageContainer,
  ProColumnType,
  ProForm,
  ProFormDateTimeRangePicker,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import EditSysUserPage from './components/EditSysUserPage';
import RoleTagList from './components/RoleTagList';
import StatusSwitch from './components/StatusSwitch';
import UserActionButtons from './components/UserActionButtons';

const SysUser: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [searchObj, setSearchObj] = useState('');
  const [creteTime, setCreteTime] = useState({ begin: '', end: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRefresh = () => {
    actionRef?.current?.reload();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleAddSuccess = () => {
    handleRefresh();
    setIsModalVisible(false);
  };

  const handleRest = () => {
    setCreteTime({ begin: '', end: '' });
    setSearchObj('');
  };

  const columns: ProColumnType<SysUserType.SysUser>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '手机',
      dataIndex: 'phone',
    },
    {
      title: '岗位',
      dataIndex: 'deptName',
    },
    {
      title: '部门',
      dataIndex: 'postName',
    },
    {
      title: '所属角色',
      dataIndex: 'roleNameList',
      render: (roleList) => <RoleTagList roleNameList={roleList} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text, record) => (
        <StatusSwitch id={record.id} status={record.status} />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <UserActionButtons
          id={record.id}
          username={record.username}
          onRefresh={handleRefresh}
        />
      ),
    },
  ];

  return (
    <PageContainer >
      <div
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          boxSizing: 'border-box',
          borderRadius: '6px',
        }}
      >
        <ProForm
          style={{ padding: '10px' }}
          layout="horizontal"
          submitter={{
            searchConfig: {
              submitText: '搜索',
              resetText: '重置',
            },
            render: (prop, doms) => {
              return [
                ...doms,
                <Button
                  key="add"
                  style={{
                    background: '#67C23A',
                    borderColor: '#67C23A',
                    color: '#FFF',
                  }}
                  onClick={handleAdd}
                >
                  添加
                </Button>,
              ];
            },
            onReset: handleRest,
          }}
          onFinish={async (values) => {
            setSearchObj(values.searchObj);
            if (values.creteTime) {
              setCreteTime({
                begin: values.creteTime[0],
                end: values.creteTime[1],
              });
            }
            handleRefresh();
            return true;
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              label="关键字"
              placeholder={'用户名/姓名/手机号码'}
              name="searchObj"
            />
            <ProFormDateTimeRangePicker
              width="md"
              label="操作时间"
              name="creteTime"
            />
          </ProForm.Group>
        </ProForm>
        <Modal
          title="新增用户信息"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <EditSysUserPage onSuccess={handleAddSuccess} />
        </Modal>
      </div>
      <ProTable<SysUserType.SysUser>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        pagination={{
          showSizeChanger: true,
          pageSize: 10,
          current: 1,
        }}
        search={false}
        options={false}
        request={async (params) => {
          const data = {
            ...params,
            searchObj: searchObj,
            createTimeBegin: creteTime.begin,
            createTimeEnd: creteTime.end,
          };
          const response = await getSysUserList(data);
          return {
            data: response.data.records,
            total: response.data.total,
          };
        }}
        style={{ paddingTop: '20px' }}
      />
    </PageContainer>
  );
};

export default SysUser;
