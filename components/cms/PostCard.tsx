import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    excerpt?: string;
    createdAt: string;
  };
  baseRoute: "/blog" | "/events";
}

export default function PostCard({ post, baseRoute }: PostCardProps) {
  return (
    <div className="card p-6 border border-border flex flex-col h-full hover:border-accent/50 transition-colors">
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
        <p className="text-text-secondary mb-6 line-clamp-3 flex-grow">
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
  );
}
