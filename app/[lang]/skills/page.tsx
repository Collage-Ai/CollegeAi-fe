'use client';
import HoverInput from '@/components/input/hoverInput';
import SkillComponent from '@/components/skillComponent';
import { useState } from 'react';
export default function Page() {
  const [showOverlay, setShowOverlay] = useState(false);
  const onInputFinish = (value: string) => {
    console.log(value);
  };
  return (
    <>
      <SkillComponent />
      {showOverlay ? (
        <div
          onClick={() => setShowOverlay(false)}
          className="fixed inset-0 z-10 bg-gray-500 opacity-50 transition-opacity duration-300 ease-in-out"
        />
      ) : (
        <div className="fixed inset-0 z-[-1] bg-gray-500 opacity-0 transition-opacity duration-300 ease-in-out" />
      )}
      <HoverInput
        onFinish={onInputFinish}
        showOverlay={showOverlay}
        setShowOverlay={setShowOverlay}
      />
    </>
  );
}
