import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    excerpt?: string;
    createdAt: string;
    images?: string[];
  };
  baseRoute: "/blog" | "/events";
}

export default function PostCard({ post, baseRoute }: PostCardProps) {
  return (
    <div className="card border border-border flex flex-col h-full hover:border-accent/50 transition-colors overflow-hidden group rounded-xl">
      {post.images && post.images.length > 0 && (
        <div className="w-full h-48 overflow-hidden bg-black border-b border-border shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.images[0]} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      )}
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="text-text-secondary mb-6 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        
        {!post.excerpt && <div className="flex-grow"></div>}

        <div className="mt-auto pt-4 border-t border-border/50">
          <Link 
            href={`${baseRoute}/${post.slug}`}
            className="text-accent hover:text-white flex items-center gap-2 font-bold transition-colors w-fit"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
