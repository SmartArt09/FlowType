import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { posts } from '@/lib/blog.tsx';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-3xl">
        <Card className="bg-card/70 backdrop-blur-sm shadow-2xl shadow-primary/5">
          <CardHeader>
            <div className="mb-6">
              <Link href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>
            <CardTitle>
              <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                {post.title}
              </h1>
            </CardTitle>
            <p className="text-sm text-muted-foreground pt-2">
              Published on {format(new Date(post.date), 'MMMM d, yyyy')}
            </p>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                {post.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
