import React from 'react';
import { Select, Space } from 'antd';
import { MessageArgs } from '@/types/user';

type SelectProps = {
  item: MessageArgs[];
  onSelectChange: (value: string) => void;
  value: string;
};

const SelectPrompt: React.FC<SelectProps> = ({
  item,
  onSelectChange,
  value
}) => {
  const handleChange = (value: string) => {
    onSelectChange(value);
  };

  const { Option } = Select;

  return (
    <Select
      defaultValue="请选择"
      style={{ width: 360 }}
      onChange={handleChange}
      value={value}
      options={item.map((item) => {
        return { label: item.userMsg, value: item.aiMsg, key: item.userId };
      })}
    />
  );
};

export default SelectPrompt;
