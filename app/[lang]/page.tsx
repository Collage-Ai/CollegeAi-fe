'use client';
// import prisma from '@/prisma';
import { Locale } from '@/i18n/config';
import { Button, Card } from 'antd';
import Progress from '@/components/progress/progressLine';
import { useEffect } from 'react';
import { getUserInfo } from '@/utils/fetcher';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';
import AppSider from '@/components/sider/sider';
import CardPersonalHome from '@/components/card/cardPersonalHome';
import ProgressCycle from '@/components/progress/progressCycle';

// revalidate this page every 10 seconds, but don't useful for this app dir, so please use pages/api for restful api and fetch on here. example see [id]/page.tsx
export const revalidate = 10;

// prisma demo
// async function getData() {
//   const feed = await prisma.post.findMany({
//     where: { published: true }
//   });
//   return feed;
// }

export default function Home({ params }: { params: { lang: Locale } }) {
  const { setUser, isLogin, setIsLogin } = useUserStore();
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setIsLogin(true);
        setUser(res);
      }
    });
  }, [setIsLogin, setUser]);
  return (
    <div>
      {/* top */}
      <div className="flex">
        {isLogin ? (
          <CardPersonalHome />
        ) : (
          <Button type="primary" href="/login">
            登录
          </Button>
        )}
        <h1>开启你的产品经理之旅</h1>
        <ProgressCycle />
      </div>
      <div className="flex">
        {/* content left */}
        <div>
          <AppSider />
        </div>
        {/* content right */}
        <div>
          <Card>
            <Progress />
            <div className="flex flex-col">
              <h1>To Do List</h1>
              <div className="flex">
                <Card title="实习" style={{ width: 300 }}></Card>
                <Card title="技能提升" style={{ width: 300 }}></Card>
                <Card title="社群活动" style={{ width: 300 }}></Card>
              </div>
            </div>
          </Card>

          <div className="flex">
            <Card
              title="行业洞察"
              extra={<Link href="/insights">点击查看更多</Link>}
              style={{ width: 300 }}
            >
              提供有关行业的深入信息和最新动态
            </Card>
            <Card
              title="资源速配"
              extra={<Link href="/skills">点击查看更多</Link>}
              style={{ width: 300 }}
            >
              提供有关职业的实习推荐和活动资源
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
