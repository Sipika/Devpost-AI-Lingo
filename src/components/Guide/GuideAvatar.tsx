import React from 'react';
import { Bot } from 'lucide-react';

type GuideAvatarProps = {
  title: string;
  children: React.ReactNode;
};

export const GuideAvatar: React.FC<GuideAvatarProps> = ({ title, children }) => {
  return (
    <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-900/50 border border-white/10 shadow-xl backdrop-blur-md">
      {/* Avatar */}
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
        <Bot className="w-6 h-6 text-white" />
      </div>
      {/* Speech bubble */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-violet-300 mb-1">{title}</h3>
        <p className="text-slate-200 leading-relaxed text-sm">{children}</p>
      </div>
    </div>
  );
};
