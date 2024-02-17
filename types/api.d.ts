import { UserBaseInfo } from './user';
export type LoginResType = {
  data?: {
    token: string;
    userBaseInfo: UserBaseInfo;
    expire: string;
  };
  code: number;
  message: string;
};

export type LoginReqType = {
  // message: string;
  // sig: string;
  // address: string;
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
