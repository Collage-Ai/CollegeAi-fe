'use client';
// import prisma from '@/prisma';
import { Locale } from '@/i18n/config';
import { Card } from 'antd';
import Progress from '@/components/progress/progressLine';
import Card1 from '@/components/card/cardHome';
import { useEffect } from 'react';
import { getUserInfo } from '@/utils/fetcher';
import { useUserStore } from '@/store/userStore';
import { UserBaseInfo } from '../../types/user';

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
  const { setUser } = useUserStore();
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser(res);
      }
    });
  }, [setUser]);

  return (
    <div>
      <div>
        <Card>
          <Progress />
        </Card>
      </div>
      <div>
        <Card1 />
        <Card1 />
      </div>
    </div>
  );
}
