'use client';
import { fetcher } from '@/utils/fetcher';
import useSWR from 'swr';
export default function Page() {
  const { data } = useSWR('/api/user', fetcher);
  return <h1>{data.name}</h1>;
}
