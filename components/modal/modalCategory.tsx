import React, { use, useEffect, useState } from 'react';
import { Button, Cascader, Input, Modal } from 'antd';
import { useStateCallback } from '@/utils/hook';
import { getCategoryList, sendCategoryInfoToServer } from '@/utils/fetcher';
import { useCategoryStore } from '@/store/userStore';
import { CategoryArgs } from '@/types/components/category';

type ModalCategoryProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  value: (string | number)[];
  setValue: (value: (string | number)[]) => void;
  type: 'chat' | 'skill';
  skillOptions?: CategoryArgs[];
};

type option = {
  value: string | number;
  label: string;
  children?: option[];
};

const chatOptions: option[] = [
  {
    value: 'a',
    label: '行业概览',
    children: [
      { value: '1', label: '定义与范围' },
      { value: '2', label: '历史发展' },
      { value: '3', label: '当前状态' }
    ]
  },
  {
    value: 'b',
    label: '市场分析',
    children: [
      { value: '4', label: '主要参与者' },
      { value: '5', label: '增长领域' },
      { value: '6', label: '消费者需求' }
    ]
  },
  {
    value: 'c',
    label: '技术趋势',
    children: [
      { value: '7', label: '新兴技术' },
      { value: '8', label: '技术应用' }
    ]
  },
  {
    value: 'd',
    label: '职业机会与发展',
    children: [
      { value: '9', label: '典型职位' },
      { value: '10', label: '技能需求' },
      { value: '11', label: '薪酬范围' }
    ]
  },
  {
    value: 'e',
    label: '工作环境与文化',
    children: [
      { value: '12', label: '工作强度' },
      { value: '13', label: '职业满意度' },
      { value: '14', label: '文化与价值观' }
    ]
  },
  {
    value: 'f',
    label: '法规与政策',
    children: [
      { value: '15', label: '行业法规' },
      { value: '16', label: '政策支持' }
    ]
  },
  {
    value: 'g',
    label: '国际视角',
    children: [
      { value: '17', label: '全球市场影响' },
      { value: '18', label: '跨国公司作用' }
    ]
  }
];

const ModalCategory: React.FC<ModalCategoryProps> = ({
  open,
  onOk,
  onCancel,
  value,
  setValue,
  type,
  skillOptions
}: ModalCategoryProps) => {
  let options: option[] = [];
  const [categoryText, setCategoryText] = useStateCallback('');
  const [isAddCategory, setIsAddCategory] = useStateCallback(false);
  const { setCategoryList } = useCategoryStore();

  const onChange = (newValue: (string | number)[]) => {
    console.log(newValue);
    setValue(newValue);
  };
  const categoryToOption = (category: CategoryArgs[]): option[] => {
    return category.map((item) => {
      return {
        value: item.id ?? item.categoryText,
        label: item.categoryText
      };
    });
  };
  const addCategory = () => {
    // 添加类别
    setIsAddCategory(false);
    // 发送请求
    sendCategoryInfoToServer(categoryText).then((res) => {
      if (res) {
        //添加成功后，重新获取类别列表
        getCategoryList().then((list) => {
          setCategoryList(list);
        });
      }
    });
  };
  if (type === 'chat') {
    options = chatOptions;
  } else if (type === 'skill') {
    options = categoryToOption(skillOptions ?? []);
  }
  return (
    <>
      <Modal
        title="归档"
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText="确认"
        cancelText="取消"
      >
        <Cascader
          options={options}
          value={value}
          onChange={onChange} // 使用定义的 onChange 函数
          placeholder="请选择归档类别"
        />
        {type === 'skill' && (
          <Button type="primary" onClick={() => setIsAddCategory(true)}>
            新增类别
          </Button>
        )}
        <Modal open={isAddCategory} onOk={addCategory}>
          <Input
            placeholder="请输入新类别"
            value={categoryText}
            onChange={(e) => setCategoryText(e.target.value)}
          />
        </Modal>
      </Modal>
    </>
  );
};

export default ModalCategory;
