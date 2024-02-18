// import prisma from '@/prisma';
import { Locale } from '@/i18n/config';
import { Card } from 'antd';
import Progress from '@/components/progress';
import Card1 from '@/components/card/cardHome';

// revalidate this page every 10 seconds, but don't useful for this app dir, so please use pages/api for restful api and fetch on here. example see [id]/page.tsx
export const revalidate = 10;

// prisma demo
// async function getData() {
//   const feed = await prisma.post.findMany({
//     where: { published: true }
//   });
//   return feed;
// }

export default async function Home({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  // const data = await getData();

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
