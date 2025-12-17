'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Place } from '../types';
import { ArrowLeft, MapPin } from './Icons';

interface BlogPostProps {
  place: Place;
  onBack: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ place, onBack }) => {
  return (
    <div className="min-h-screen bg-background animate-in slide-in-from-bottom-8 duration-500">
      <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center px-4 md:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Places
        </button>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-20 max-w-4xl">
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img 
            src={place.image} 
            alt={place.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
            <div className="flex gap-2 mb-4">
              {place.tags.map(tag => (
                <span key={tag} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/30">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">
              {place.name}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span>Adventure Log</span>
            </div>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-foreground prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:font-bold prose-h1:mb-4 prose-h1:mt-8 prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:md:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-foreground prose-strong:font-semibold prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4 prose-li:text-muted-foreground prose-li:mb-2 prose-li:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {place.content || place.description}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
};