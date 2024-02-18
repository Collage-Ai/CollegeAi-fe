import React from 'react';
import { Select, Space } from 'antd';
import { MessageArgs } from '@/types/user';

type SelectProps = {
  item: MessageArgs[];
  onSelectChange: (value: string) => void;
};

const SelectPrompt: React.FC<SelectProps> = ({ item, onSelectChange }) => {
  const handleChange = (value: string) => {
    onSelectChange(value);
  };
  return (
    <Select
      defaultValue="请选择"
      style={{ width: 120 }}
      onChange={handleChange}
      options={item.map((item) => {
        return { label: item.userMsg, value: item.aiMsg, key: item.userId };
      })}
    />
  );
};

export default SelectPrompt;
