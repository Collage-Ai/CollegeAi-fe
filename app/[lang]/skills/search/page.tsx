'use client';
import ChatComponent from '@/components/chatComponent';
import { useSkillStore } from '@/store/userStore';
export default function Page() {
  const { searchPrompt } = useSkillStore();
  return (
    <>
      <ChatComponent type="skill" search={searchPrompt} />
    </>
  );
}
