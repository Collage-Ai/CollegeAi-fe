'use client';
import ChatComponent from '@/components/chatComponent';
import DisplayComponent from '@/components/displayComponent';
import ChatSider from '@/components/sider/chatSider';
import { useChatStore } from '@/store/userStore';
import { CloseOutlined } from '@ant-design/icons';
import { Card, Flex } from 'antd';
export default function Page() {
  const { displayCategory, setDisplayCategory } = useChatStore();
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1>你的专属行业洞察</h1>
        <Flex>
          <Card title="基本信息">
            <ChatSider />
          </Card>
          <Card
            extra={
              displayCategory !== -1 && (
                <CloseOutlined onClick={() => setDisplayCategory(-1)} />
              )
            }
          >
            {displayCategory === -1 ? (
              <ChatComponent type="insight" />
            ) : (
              <DisplayComponent />
            )}
          </Card>
          <Card title="最新行业信息"></Card>
        </Flex>
      </div>
    </>
  );
}
