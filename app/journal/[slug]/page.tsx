import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/data/articles';
import { Badge } from '@/components/ui/Badge';
import { Clock, ArrowLeft, ArrowRight, Share2, Bookmark } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: Props) {
  const article = ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="bg-ivory min-h-screen pb-24">
      
      {/* Back button & Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-earth-600 hover:text-forest transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to The Hair Journal</span>
        </Link>
      </div>

      {/* Article Header & Hero */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-4 text-center">
          <Badge variant="forest">{article.category}</Badge>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-forest leading-tight">
            {article.title}
          </h1>
          <p className="font-sans text-base sm:text-lg text-earth-600 max-w-2xl mx-auto leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-center gap-4 text-xs font-sans text-earth-500 pt-2">
            <span>By <strong>{article.author.name}</strong> ({article.author.role})</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
            <span>•</span>
            <span>{article.publishDate}</span>
          </div>
        </div>

        {/* Big Cover Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-cream-100 border border-cream-200">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-forest max-w-none font-sans text-earth-800 space-y-8 pt-6">
          {article.content.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.sectionHeading && (
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest pt-4">
                  {section.sectionHeading}
                </h2>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-earth-700">
                  {para}
                </p>
              ))}

              {section.pullQuote && (
                <blockquote className="my-6 p-6 rounded-2xl bg-cream-100 border-l-4 border-forest font-serif italic text-lg sm:text-xl text-forest">
                  &ldquo;{section.pullQuote}&rdquo;
                </blockquote>
              )}

              {section.bulletPoints && (
                <ul className="space-y-2 text-sm text-earth-700 bg-cream-50 p-6 rounded-2xl border border-cream-200">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-forest font-bold">•</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-cream-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-sans font-bold uppercase tracking-wider text-earth-500 mr-2">Tags:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-cream-100 border border-cream-300 text-xs font-sans text-earth-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="pt-16 border-t border-cream-200 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-forest">Continue Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/journal/${rel.slug}`}
                className="p-5 rounded-2xl bg-cream-50 border border-cream-200 hover:border-sage transition-all space-y-2 group"
              >
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-sage">
                  {rel.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-forest group-hover:text-sage transition-colors">
                  {rel.title}
                </h4>
                <p className="font-sans text-xs text-earth-600 line-clamp-2">{rel.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

      </article>

    </div>
  );
}
