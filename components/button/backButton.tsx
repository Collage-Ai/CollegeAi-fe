import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';

interface BackButtonProps {
  title: string;
}

// eslint-disable-next-line react/prop-types
const BackButton: React.FC<BackButtonProps> = ({ title }) => {
  return (
    <div className="ml-6 mt-4 flex items-center justify-start">
      <Button type="text" icon={<ArrowLeftOutlined />}>
        <Link href="/">返回首页</Link>
      </Button>
      <h1 className="ml-[5vw]">{title}</h1>
    </div>
  );
};

export default BackButton;
