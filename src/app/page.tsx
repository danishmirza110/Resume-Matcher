import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Resume Matcher - Find Your Perfect Job Match</title>
        <meta
          name="description"
          content="Upload your resume, analyze it with AI, and get personalized job matches. Improve your resume, enhance your career, and land your dream job faster!"
        />
        <meta
          name="keywords"
          content="AI Resume Matcher, Job Matching, Resume Analysis, Career AI, Resume Screening, ATS Resume, AI Job Matching, Job Search Platform, CV Analysis, Resume Optimization, Job Application AI, AI Career Advisor, AI-Powered Job Search, Resume Builder, Skill Matching, Resume Matching Algorithm, Job Fit Analysis, Smart Career Match, Career Development AI"
        />
      </Head>
      <div>
        <HeroSection />
        <HowItWorks />
      </div>
    </>
  );
}
