'use client';
import HoverInput from '@/components/input/hoverInput';
import SkillSider from '@/components/sider/skillSider';
import SkillComponent from '@/components/skillComponent';
import { Row } from 'antd';
import { useState } from 'react';
export default function Page() {
  //const { data } = useSWR('/api/user', fetcher);
  const [showOverlay, setShowOverlay] = useState(false);
  const onInputFinish = (value: string) => {
    console.log(value);
  };
  return (
    <div className="flex flex-col">
      <h1>资源速配</h1>
      <Row justify="center" gutter={16} wrap={false}>
        <SkillSider />
        <SkillComponent />
        <HoverInput
          onFinish={onInputFinish}
          showOverlay={showOverlay}
          setShowOverlay={setShowOverlay}
        />
      </Row>
    </div>
  );
}
