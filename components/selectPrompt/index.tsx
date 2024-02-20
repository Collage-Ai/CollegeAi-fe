import React from 'react';
import { Select } from 'antd';
import { MessageArgs } from '@/types/user';

type SelectProps = {
  item: MessageArgs[];
  onSelectChange: (value: { userMsg: string; aiMsg: string }) => void; // 更新函数签名
  value: string;
};

const SelectPrompt: React.FC<SelectProps> = ({
  item,
  onSelectChange,
  value
}) => {
  const handleChange = (value: string, option: any) => {
    // 使用 option 参数获取额外的数据
    onSelectChange({ userMsg: option.key, aiMsg: value }); // 传递一个对象包含 userMsg 和 aiMsg
  };

  return (
    <Select
      defaultValue="请选择"
      style={{ width: 360 }}
      onChange={handleChange}
      value={value}
      options={item.map((item) => ({
        label: item.userMsg,
        value: item.aiMsg,
        key: item.userMsg // key 用作 userMsg
      }))}
    />
  );
};

export default SelectPrompt;
