// app/page.tsx
'use client';
import CustomLayout from '../components/Layout/Layout';

export default function Home() {
  return (
    <CustomLayout>
      <h1>Welcome to my Next.js app!</h1>
      <p>This is the home page.</p>
    </CustomLayout>
  );
}