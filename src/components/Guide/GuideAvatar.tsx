import React from 'react';
import { Bot } from 'lucide-react';

type GuideAvatarProps = {
  title: string;
  children: React.ReactNode;
};

export const GuideAvatar: React.FC<GuideAvatarProps> = ({ title, children }) => {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg bg-slate-800 shadow-lg">
      {/* Avatar */}
      <div className="flex-shrink-0 w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
        <Bot className="w-8 h-8 text-violet-300" />
      </div>
      {/* Speech bubble */}
      <div className="flex-1">
        <h3 className="text-lg font-medium text-violet-200 mb-1">{title}</h3>
        <p className="text-slate-200 leading-relaxed">{children}</p>
      </div>
    </div>
  );
};
