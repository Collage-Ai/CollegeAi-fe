'use client';
import { Input } from 'antd';
import { useState } from 'react';

type InputProps = {
  onFinish: (value: string) => void; // 输入完成后的回调函数
  setShowOverlay: (show: boolean) => void;
  showOverlay: boolean;
};

const HoverInput = ({ onFinish, setShowOverlay, showOverlay }: InputProps) => {
  const [value, setValue] = useState('');

  // 处理输入变化
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  // 处理输入完成
  const handlePressEnter = () => {
    onFinish(value); // 触发回调
    setValue(''); // 清空输入框
    setShowOverlay(false); // 隐藏输入框
  };

  return (
    <div className={`absolute ${showOverlay ? 'z-10' : ''} bottom-4`}>
      {showOverlay && (
        <div className="absolute inset-0 size-full bg-gray-500 opacity-50" />
      )}
      <Input
        value={value}
        onChange={handleChange}
        onPressEnter={handlePressEnter}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
        className={`transition-all duration-300 ease-in-out ${
          showOverlay ? 'scale-105' : ''
        }`}
        style={{ backgroundColor: showOverlay ? 'lightgray' : 'white' }}
      />
    </div>
  );
};

export default HoverInput;
