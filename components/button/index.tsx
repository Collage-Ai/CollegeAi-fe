'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'cursor-pointer rounded-full bg-blue-500 font-medium text-white active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-purple-500 text-white'
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg'
    }
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary'
  }
});

interface ButtonProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  size?: 'sm' | 'md';
  color?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button = ({
  size,
  color,
  children,
  className,
  onClick
}: ButtonProps) => {
  return (
    <div
      className={button({
        size,
        color,
        class: className
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
