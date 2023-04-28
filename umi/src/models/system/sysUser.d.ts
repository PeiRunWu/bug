export declare namespace SysUserType {
  interface SysUser {
    id: string;
    username: string;
    name: string;
    password: password;
    phone: string;
    deptName: string | null;
    postName: string | null;
    roleNameList: string[];
    status: number;
    description: string;
    headUrl: string;
    createTime: string;
  }

  interface PageQuery {
    current?: number;
    pageSize?: number;
    searchObj?: string;
    createTimeBegin?: string | null;
    createTimeEnd?: string | null;
  }

  interface SysUserVO {
    id: string;
    username: string;
    name: string;
    password: password;
    phone: string;
    headUrl: string;
    description: string;
  }
}
