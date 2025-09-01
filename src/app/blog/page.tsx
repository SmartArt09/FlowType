import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { posts } from '@/lib/blog';
import { format } from 'date-fns';

export default function BlogPage() {
  return (
    <main className="flex flex-1 flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 py-2">
            The FlowType Blog
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Tips, tricks, and insights on mastering the art of typing.
          </p>
        </header>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
              <Card className="bg-card/70 backdrop-blur-sm shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </p>
                  <CardDescription className="pt-2">{post.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
