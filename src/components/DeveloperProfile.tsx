import React, { useState } from 'react';
import {
  ExternalLink,
  Mail,
  Check,
  Copy,
  Code2,
  Sparkles,
  Smartphone,
  Globe,
  Heart,
  Award,
  ArrowUpRight,
} from 'lucide-react';

export const DeveloperProfile: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = 'sharwar.simon@gmail.com';
  const fiverrUrl = 'https://fiverr.com/symon123';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const skills = [
    'Web Development',
    'Mobile Apps (PWA)',
    'React & TypeScript',
    'Next.js & Node.js',
    'Tailwind CSS',
    'UI/UX Design',
    'API Integration',
  ];

  const services = [
    {
      title: 'কাস্টম ওয়েবসাইট ও ওয়েব অ্যাপ',
      desc: 'রেসপন্সিভ, দ্রুত ও আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি',
    },
    {
      title: 'মোবাইল ফ্রেন্ডলি অ্যাপস (PWA)',
      desc: 'মোবাইলের মতো দেখতে ও কাজ করা লাইটওয়েট অ্যাপস',
    },
    {
      title: 'UI/UX ও ফ্রন্টএন্ড ডিজাইন',
      desc: 'ব্যবহারকারী-বান্ধব এবং পরিচ্ছন্ন ইন্টারফেস ডিজাইন',
    },
  ];

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-200">
      {/* Hero Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-700 via-sky-800 to-slate-900 text-white p-5 shadow-lg">
        {/* Background decorative circles */}
        <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-sky-500/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Developer Photo */}
          <div className="relative group">
            <div className="h-28 w-28 rounded-full ring-4 ring-white/30 shadow-xl overflow-hidden bg-slate-800 p-0.5 transition-transform group-hover:scale-105">
              <img
                src="/sharwar_simon.jpg"
                alt="SharwaR Simon"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback if image load fails
                  const target = e.target as HTMLImageElement;
                  target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <div className="absolute bottom-0 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-slate-900 shadow-md">
              <Code2 className="h-4 w-4" />
            </div>
          </div>

          {/* Name & Title */}
          <h2 className="mt-3.5 text-2xl font-bold tracking-tight text-white">
            SharwaR Simon
          </h2>
          <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-sky-200 backdrop-blur-xs">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>Full Stack Developer & Digital Creator</span>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-200 max-w-sm">
            হ্যালো! আমি <strong>SharwaR Simon</strong>। আধুনিক, দ্রুত এবং ব্যবহারকারী-বান্ধব ওয়েব
            ও মোবাইল অ্যাপ্লিকেশন তৈরিতে নিবেদিতপ্রাণ। চট্টগ্রাম শহরের সাধারণ মানুষ ও যাত্রীদের
            দৈনন্দিন যাতায়াত সহজ করতে এই <strong>চট্টগ্রাম বাস রুট</strong> অ্যাপটি তৈরি করেছি।
          </p>

          {/* Fiverr CTA Button */}
          <div className="mt-4 w-full max-w-xs">
            <a
              href={fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="fiverr-profile-button"
              className="group flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-2xl bg-[#1dbf73] hover:bg-[#19a463] active:scale-98 text-white font-bold text-sm shadow-lg shadow-[#1dbf73]/30 transition-all"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 font-black text-xs">
                fi
              </div>
              <span>Fiverr-এ অর্ডার করুন / Hire Me</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Fiverr Showcase Card */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1dbf73]/10 text-[#1dbf73] font-bold text-base">
              fi
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Fiverr প্রোফাইল</h3>
              <p className="text-[11px] text-slate-500">fiverr.com/symon123</p>
            </div>
          </div>

          <a
            href={fiverrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-[#1dbf73] hover:underline"
          >
            <span>ভিজিট করুন</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <p className="mt-3 text-xs text-slate-600 leading-relaxed">
          আপনার ব্যবসা, সংগঠন বা ব্যক্তিগত প্রয়োজনে যে কোনো কাস্টম ওয়েবসাইট, মোবাইল অ্যাপস বা ওয়েব
          সলিউশনের জন্য সরাসরি Fiverr-এ যোগাযোগ করতে পারেন।
        </p>

        <div className="mt-3 grid grid-cols-1 gap-2">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                <Check className="h-3 w-3 stroke-[3]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{srv.title}</h4>
                <p className="text-[11px] text-slate-500">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Tech Stack */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-sky-600" />
          <span>দক্ষতা ও প্রযুক্তি (Skills)</span>
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Card */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5 text-sky-600" />
          <span>যোগাযোগ (Contact)</span>
        </h3>

        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center gap-2.5 truncate pr-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700 shrink-0">
              <Mail className="h-4 w-4" />
            </div>
            <div className="truncate">
              <span className="block text-[10px] text-slate-400 font-semibold uppercase">
                ইমেইল ঠিকানা
              </span>
              <a
                href={`mailto:${email}`}
                className="text-xs font-bold text-slate-800 hover:text-sky-600 truncate block"
              >
                {email}
              </a>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            title="ইমেইল কপি করুন"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold shrink-0 transition-colors shadow-2xs"
          >
            {copiedEmail ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">কপি হয়েছে</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>কপি</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* App Dedication Note */}
      <div className="text-center py-2 text-xs text-slate-400 flex items-center justify-center gap-1">
        <span>Made with</span>
        <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
        <span>by SharwaR Simon for Chattogram</span>
      </div>
    </div>
  );
};
