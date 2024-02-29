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
import { getAIAnalysis } from '@/utils/ai';
import { aiAnalysis } from '@/types/components/ai';

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
  const {
    setUser,
    isLogin,
    setIsLogin,
    user,
    analyticsResult,
    setAnalyticsResult
  } = useUserStore();
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setIsLogin(true);
        setUser(res);
      }
    });
  }, [setIsLogin, setUser]);

  useEffect(() => {
    if (isLogin && user && analyticsResult === null) {
      getAIAnalysis(user).then((res) => {
        if (res !== null) setAnalyticsResult(res);
      });
    }
  }, [isLogin, setAnalyticsResult]);
  return (
    <div>
      {/* top */}
      <div className="flex">
        {isLogin ? (
          <CardPersonalHome />
        ) : (
          <Button type="primary" href="/login" className="ml-4 mt-6">
            点此登录
          </Button>
        )}
        <h1 className="ml-[10vw] mt-6">
          开启你的{user?.career || 'CollegeAi'}之旅
        </h1>
        <ProgressCycle />
      </div>
      <div className="flex">
        {/* content left */}
        <div>
          <AppSider />
        </div>
        {/* content right */}
        <div>
          <Card className="flex flex-col">
            <Progress />
            <div className="mt-4 flex flex-col p-6">
              <h1>To Do List</h1>
              <p>{analyticsResult?.建议活动}</p>
              <div className="flex w-[75vw] justify-between">
                <Card title="实习" style={{ width: '20vw' }}></Card>
                <Card title="技能提升" style={{ width: '20vw' }}></Card>
                <Card title="社群活动" style={{ width: '20vw' }}></Card>
              </div>
            </div>
          </Card>
          <div className="mt-12 flex min-w-[75vw] justify-between">
            <Card
              title="行业洞察"
              extra={<Link href="/insights">点击查看更多</Link>}
              style={{ width: '25vw' }}
            >
              提供有关行业的深入信息和最新动态
            </Card>
            <Card
              title="资源速配"
              extra={<Link href="/skills">点击查看更多</Link>}
              style={{
                width: '50vw'
              }}
            >
              提供有关职业的实习推荐和活动资源
              <div className="flex justify-between">
                <Card title="实习" className="w-[18vw]" />
                <Card title="竞赛" className="w-[18vw]" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
