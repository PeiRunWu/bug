import { createSysUser, getSysUserById, updateSysUserById } from '@/services/system/sysUserService';
import {
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { Rule } from 'antd/es/form';
import { UploadChangeParam } from 'antd/es/upload';
import React, { useEffect, useRef, useState } from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const phoneValidator: Rule = {
  pattern: /^1[3-9]\d{9}$/,
  message: '请输入正确的手机号',
};

interface Props {
  id?: string;
  onSuccess: () => void;
}

const EditSysUserPage: React.FC<Props> = React.memo(({ id, onSuccess }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);

  const formRef = useRef<ProFormInstance>();

  const isCreate = !id;

  useEffect(() => {
    async function fetchUser() {
      if (!isCreate) {
        try {
          const response = await getSysUserById(id);
          if (response.code === 200) {
            formRef?.current?.setFieldsValue(response.data);
            setFileList([
              {
                uid: '-1',
                name: 'avatar.jpg',
                status: 'done',
                url: response.data.headUrl,
              },
            ]);
          }
        } catch (error) {
          console.log(error);
          message.error('请求失败,error:[' + error + ']');
        }
      }
    }
    fetchUser();
  }, [id, onSuccess, formRef]);

  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  const handleFinsh = async (values: any) => {
    const headUrl = values.file && values.file[0]?.response;
    delete values.file;
    const data = { ...values, headUrl };
    const saveOrUpdateData = isCreate
      ? await createSysUser(data)
      : await updateSysUserById({ id: id!, ...data });
    if (saveOrUpdateData.code === 200) {
      onSuccess();
    }
  };

  const handleChange = ({ fileList: newFileList }: UploadChangeParam) => {
    const lastFile = newFileList.slice(-1);
    setFileList(lastFile);
  };

  return (
    <ProForm layout="horizontal" {...formItemLayout} onFinish={handleFinsh} formRef={formRef}>
      <ProFormText
        width="md"
        name="username"
        label="用户名"
        tooltip="输入用户名长度为4-20"
        placeholder="请输入用户名"
        rules={[
          { required: true, message: '请输入用户名' },
          {
            min: 4,
            max: 20,
            message: '输入用户名长度为4-20',
          },
        ]}
      />

      <ProFormText
        width="md"
        name="name"
        label="姓名"
        tooltip="输入姓名长度为4-20"
        placeholder="请输入姓名"
        rules={[
          { required: true, message: '请输入姓名' },
          {
            min: 4,
            max: 20,
            message: '输入姓名长度为4-20',
          },
        ]}
      />

      {isCreate && (
        <ProFormText.Password
          width="md"
          name="password"
          label="密码"
          tooltip="输入密码长度为6-10"
          placeholder="请输入密码"
          rules={[
            { required: true, message: '请输入密码' },
            {
              min: 6,
              max: 10,
              message: '输入密码长度为6-10',
            },
          ]}
        />
      )}

      <ProFormText
        width="md"
        name="phone"
        label="手机"
        placeholder="请输入手机号"
        rules={[phoneValidator]}
      />

      <ProFormText width="md" name="description" label="描述" placeholder="请输入描述信息" />

      <ProFormUploadButton
        name="file"
        label="头像"
        max={1}
        action={'/api/system/oss/file'}
        fieldProps={{
          name: 'file',
          fileList: fileList,
          listType: 'picture-card',
          onPreview: handlePreview,
          onChange: handleChange,
        }}
      />
      <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </ProForm>
  );
});

export default EditSysUserPage;
