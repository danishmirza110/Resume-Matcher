// app/about/page.tsx
'use client';
import { AboutSection } from '@/components/about/AboutSection';


export default function AboutPage() {
  return (
    <main className="pt-28 px-6 sm:px-10 md:px-20 bg-gray-50 min-h-screen">
      <AboutSection />
    </main>
  );
}
