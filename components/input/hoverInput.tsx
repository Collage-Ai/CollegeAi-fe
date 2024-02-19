'use client';
import { Button, Input } from 'antd';
import { useState } from 'react';

type InputProps = {
  onFinish: (value: string) => void; // 输入完成后的回调函数
  setShowOverlay: (show: boolean) => void;
  showOverlay: boolean;
};

const HoverInput = ({ onFinish, setShowOverlay, showOverlay }: InputProps) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 处理输入变化
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  // 处理输入完成
  const handlePressEnter = () => {
    onFinish(value); // 触发回调
    setValue(''); // 清空输入框
    setShowOverlay(false); // 隐藏输入框
    setIsLoading(true);
  };

  return (
    <div className={`absolute ${showOverlay ? 'z-10' : ''} bottom-4 flex p-10`}>
      {/* {showOverlay && (
        <div className="absolute inset-0 size-full bg-gray-500 opacity-50" />
      )} */}
      <Input
        value={value}
        onChange={handleChange}
        onPressEnter={handlePressEnter}
        onFocus={() => setShowOverlay(true)}
        //onMouseLeave={() => setShowOverlay(false)}
        className={`transition-all duration-300 ease-in-out ${
          showOverlay ? 'scale-105' : ''
        }`}
      />
      {isLoading ? (
        <Button type="dashed">加载中</Button>
      ) : (
        <Button type="primary" onClick={handlePressEnter}>
          发送
        </Button>
      )}
    </div>
  );
};

export default HoverInput;
