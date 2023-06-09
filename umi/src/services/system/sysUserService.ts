import { SysUserType } from '@/models/system/sysUser';
import { request } from '@umijs/max';

export async function getSysUserList(params: SysUserType.PageQuery) {
  return request<BaseResponse<PageInfo<SysUserType.SysUser>>>(
    '/api/system/sysUser/listPage',
    {
      method: 'GET',
      params,
    },
  );
}

export async function updateSysUserStatus(id: string, status: number) {
  return request<BaseResponse<string>>(
    `/api/system/sysUser/updateStatus/${id}/${status}`,
    {
      method: 'GET',
    },
  );
}

export async function getSysUserById(id: string) {
  return request<BaseResponse<SysUserType.SysUserVO>>(
    `/api/system/sysUser/get/${id}`,
    {
      method: 'GET',
    },
  );
}

export async function createSysUser(params: SysUserType.SysUserVO) {
  return request<BaseResponse<string>>('/api/system/sysUser/register', {
    method: 'POST',
    data: params,
  });
}

export async function updateSysUserById(params: SysUserType.SysUserVO) {
  return request<BaseResponse<string>>('/api/system/sysUser/update', {
    method: 'PUT',
    data: params,
  });
}

export async function deleteSysUserById(id: string) {
  return request<BaseResponse<string>>(`/api/system/sysUser/delete/${id}`, {
    method: 'DELETE',
  });
}
