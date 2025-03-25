"use client";
import { Globe } from '@/components/ui/globe';
import { Meteors } from '@/components/ui/meteors';
import { useEffect, useState } from 'react';
import { Laptop, Edit, Flag, Bug, Award, BugIcon, Briefcase } from 'lucide-react';
import { Marquee3D } from '@/components/ui/marquee3D';
import { Marquee } from '@/components/ui/marquee';
import { cn } from '@/lib/utils';

export default function Home() {
  const activities = [
    {
      icon: Laptop,
      title: "Penetration Testing",
      description: "Doing web/mobile application security assessments and network security testings"
    },
    {
      icon: Edit,
      title: "Blogging",
      description: "I write blogs on topics related to cybersecurity for clients and for my own blog."
    },
    {
      icon: Bug,
      title: "Bug Bounty Hunting",
      description: "Doing bug bounty hunting currently ranked..."
    },
    {
      icon: Flag,
      title: "CTF Player",
      description: "I actively take part in web and mobile based CTF (Capture the flag) challenges to learn new things and sharpen my skills"
    }
  ];

  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];
 
  const ReviewCard = ({
    img,
    name,
    username,
    body,
  }: {
    img: string;
    name: string;
    username: string;
    body: string;
  }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        )}
      >
        <div className="flex flex-row items-center gap-2">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{body}</blockquote>
      </figure>
    );
  };

  const AchievementCard = ({ icon: Icon, value, label }: { icon: any, value: string, label: string }) => {
    return (
      <div className="bg-black/10 dark:bg-white/10 p-6 rounded-xl border border-green-500/30 
                      flex flex-col items-center text-center space-y-4 
                      hover:scale-105 transition-transform duration-300 
                      animate-fade-in-up">
        <div className='w-16 h-16 rounded-full border-2 border-green-500 
                        flex items-center justify-center'>
          <Icon className='w-8 h-8 text-green-500' />
        </div>
        <h3 className='text-3xl font-bold text-green-600'>{value}</h3>
        <p className='text-sm opacity-70'>{label}</p>
      </div>
    );
  };

  return (
    <div className='flex flex-col min-h-screen w-full relative pb-20'>
      <div className='w-full flex flex-col items-center pt-16 space-y-4'>
        {/* Title */}
        <h1 className='text-5xl font-bold text-center mb-4'>Shubham Gupta</h1>

        {/* Description */}
        <p className='text-3xl font-semibold text-center'>Penetration Tester, Bug Hunter, Traveller</p>

        {/* What I Do Section */}
        <div className='w-full max-w-4xl px-4 py-12'>
          <h2 className='text-4xl font-bold text-center mb-10'>What I Do</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {activities.map((activity, index) => (
              <div
                key={index}
                className='bg-black/10 dark:bg-white/10 p-6 rounded-xl border border-green-500/30 
                           flex flex-col items-center text-center space-y-4 hover:scale-105 transition-transform'
              >
                <div className='w-16 h-16 rounded-full border-2 border-green-500 
                                flex items-center justify-center'>
                  <activity.icon className='w-8 h-8 text-green-500' />
                </div>
                <h3 className='text-2xl font-semibold'>{activity.title}</h3>
                <p className='text-sm opacity-70'>{activity.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className='w-full max-w-4xl px-4 py-12'>
          <h2 className='text-4xl font-bold text-center mb-10'>Achievements</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <AchievementCard 
              icon={Award} 
              value="600+" 
              label="Hall of Fame" 
            />
            <AchievementCard 
              icon={BugIcon} 
              value="1337+" 
              label="Bugs Reported" 
            />
            <AchievementCard 
              icon={Briefcase} 
              value="50+" 
              label="Projects" 
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className=''>
          <h2 className='text-4xl font-bold text-center'>Testimonials</h2>
        </div>
        <Marquee pauseOnHover className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}