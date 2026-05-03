import { Head, Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import ContactSection from '@/components/section/contact-section';
import type { Post } from '@/types/blog';

interface Props {
    posts: Post[];
}

export default function BlogIndex({ posts }: Props) {
    return (
        <>
            <Head title="Blog" />

            <section id="blog" className="mx-auto max-w-3xl py-10">
                {/* HEADER */}

                <div>
                    <h1 className="mb-2 text-2xl font-semibold tracking-tight text-orange-900 dark:text-orange-400">
                        Blog
                        <span className="ml-2 rounded-md border border-orange-200 bg-orange-50 px-2 py-1 text-sm text-orange-600 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                            {posts.length} posts
                        </span>
                    </h1>

                    <p className="mb-8 text-sm text-gray-600 dark:text-orange-300">
                        My thoughts on software development, life, and more.
                    </p>
                </div>

                {/* POSTS */}

                {posts.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        {posts.map((post, index) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex items-start gap-x-3"
                            >
                                {/* NUMBER */}

                                <span className="mt-1.25 font-mono text-xs font-medium text-orange-400 tabular-nums dark:text-orange-500">
                                    {String(index + 1).padStart(2, '0')}.
                                </span>

                                {/* CONTENT */}

                                <div className="flex flex-1 flex-col gap-y-2">
                                    <p className="text-lg font-medium tracking-tight">
                                        <span className="text-gray-700 transition-colors group-hover:text-orange-800 dark:text-gray-300 dark:group-hover:text-orange-400">
                                            {post.title}

                                            <ChevronRight className="ml-1 inline-block size-4 -translate-x-2 stroke-[2.5] text-orange-400 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </span>
                                    </p>

                                    <p className="text-xs text-gray-500 dark:text-orange-300">
                                        {post.published_at}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-orange-200 px-4 py-12 dark:border-orange-800">
                        <p className="text-center text-gray-500 dark:text-orange-300">
                            No blog posts yet.
                        </p>
                    </div>
                )}
            </section>
            <ContactSection />
        </>
    );
}
