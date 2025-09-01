
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { posts } from '@/lib/blog.tsx';
import { format } from 'date-fns';
import { AdBanner } from '@/components/ad-banner';
import { Separator } from '@/components/ui/separator';

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

        <div className="text-center py-12">
          <Separator className="my-8" />
          <h3 className="text-xl font-semibold mb-2">Want to contribute?</h3>
          <p className="text-muted-foreground">
            You can add a new Blog, Tutorial, or Tip by opening an issue on our GitHub.
            <br />
            Please use the title{' '}
            <code className="bg-muted text-muted-foreground font-mono p-1 rounded-md text-sm">Blog Addition Request</code>{' '}
            and add your content in the description.
          </p>
          <Link
            href="https://github.com/SmartArt09/FlowType/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Create a New Issue
          </Link>
        </div>


        <div className="pt-4">
            <AdBanner />
        </div>

      </div>
    </main>
  );
}
