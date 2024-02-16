import React, { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  message: string;
  typingSpeed?: number; // 可选的打字速度属性，以毫秒为单位
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  message,
  typingSpeed = 50
}) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const type = () => {
      if (index < message.length) {
        setDisplayedMessage((prev) => prev + message.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
        // 使用requestAnimationFrame代替setTimeout
        animationFrameId = requestAnimationFrame(type);
      }
    };

    animationFrameId = requestAnimationFrame(type);

    return () => cancelAnimationFrame(animationFrameId); // 清理函数
  }, [message, index]);

  return <div>{displayedMessage}</div>;
};

export default TypewriterEffect;
