import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface BackButtonProps {
  title: string;
}

// eslint-disable-next-line react/prop-types
const BackButton: React.FC<BackButtonProps> = ({ title }) => {
  return (
    <div className="mt-4 flex items-center justify-start">
      <ArrowLeftOutlined />
      <Link href="/">返回首页</Link>
      <h1>{title}</h1>
    </div>
  );
};

export default BackButton;
