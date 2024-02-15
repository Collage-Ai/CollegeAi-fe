import React, { useEffect, useState } from 'react';

type TypewriterEffectProps = {
  message: string;
};

const TypewriterEffect = ({ message }: TypewriterEffectProps) => {
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50); // 每50毫秒显示一个字符

    return () => clearInterval(timer);
  }, [message]);

  return <div>{displayedMessage}</div>;
};

export default TypewriterEffect;
