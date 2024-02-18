import { useChatStore } from '@/store/userStore';
import { FloatButton, List } from 'antd';
import CardInsight from '../card/cardInsight';
import { OpenAIOutlined } from '@ant-design/icons';

// type DisplayComponentProps = {

// };

const DisplayComponent: React.FC = () => {
  const { chatCategoryList, displayCategory, setDisplayCategory } =
    useChatStore();
  console.log(chatCategoryList);
  return (
    <div>
      <h1>{displayCategory}</h1>
      <List
        className="flex-1 overflow-auto"
        dataSource={chatCategoryList}
        renderItem={(item) => <CardInsight item={item} />}
      />
      <FloatButton
        icon={<OpenAIOutlined />}
        type="default"
        style={{ right: 94 }}
        onClick={() => setDisplayCategory(-1)}
      />
    </div>
  );
};

export default DisplayComponent;
