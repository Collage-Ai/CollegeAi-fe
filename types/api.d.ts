import { UserBaseInfo } from './user';
export type LoginResType = {
  data: {
    token: string;
    userInfo: UserBaseInfo;
    expire?: string;
  };
  statusCode: number;
  msg: string;
};

export type LoginReqType = {
  phone: string;
  password: string;
};

export interface ResType {
  data?: any;
  code: number;
  message: string;
}

export type RegisterReqType = UserBaseInfo & {
  SMSCode: number;
};
