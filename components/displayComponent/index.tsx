import { useChatStore } from '@/store/userStore';
import { List } from 'antd';
import CardInsight from '../card/cardInsight';

// type DisplayComponentProps = {

// };

const DisplayComponent: React.FC = () => {
  const { chatCategoryList, displayCategory } = useChatStore();
  return (
    <div>
      <h1>{displayCategory}</h1>
      <List
        className="flex-1 overflow-auto"
        dataSource={chatCategoryList}
        renderItem={(item) => <CardInsight item={item} />}
      />
      {/* <FloatButton
        icon={<OpenAIOutlined />}
        type="default"
        style={{ right: 94 }}
        onClick={() => setDisplayCategory(-1)}
      /> */}
    </div>
  );
};

export default DisplayComponent;
