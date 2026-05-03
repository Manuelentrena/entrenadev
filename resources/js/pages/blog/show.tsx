import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import CodeBlock from '@/components/code-block';
import ContactSection from '@/components/section/contact-section';
import type { Post } from '@/types/blog';

interface Props {
    post: Post;
}

export default function BlogShow({ post }: Props) {
    const [contentParts, setContentParts] = useState<any[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHydrated(true);

        // Función para parsear HTML
        const parseContent = (html: string) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const preElements = tempDiv.querySelectorAll('pre');

            if (preElements.length === 0) {
                return [{ type: 'html', content: html }];
            }

            let processedHtml = html;
            const codeBlocks = [] as any[];

            preElements.forEach((pre, index) => {
                const codeElement = pre.querySelector('code');

                if (codeElement) {
                    const code = codeElement.textContent || '';
                    const className = codeElement.className || '';
                    const languageMatch = className.match(/language-(\w+)/);
                    const language = languageMatch
                        ? languageMatch[1]
                        : 'javascript';

                    codeBlocks.push({
                        type: 'code',
                        code: code,
                        language: language,
                        marker: `__CODE_BLOCK_${index}__`,
                    });

                    const preHtml = pre.outerHTML;
                    processedHtml = processedHtml.replace(
                        preHtml,
                        `__CODE_BLOCK_${index}__`,
                    );
                }
            });

            const parts_result = [];
            let remainingHtml = processedHtml;

            for (const block of codeBlocks) {
                const index = remainingHtml.indexOf(block.marker);

                if (index > 0) {
                    const htmlPart = remainingHtml.substring(0, index);

                    if (htmlPart.trim()) {
                        parts_result.push({ type: 'html', content: htmlPart });
                    }
                }

                parts_result.push(block);
                remainingHtml = remainingHtml.substring(
                    index + block.marker.length,
                );
            }

            if (remainingHtml.trim()) {
                parts_result.push({ type: 'html', content: remainingHtml });
            }

            return parts_result;
        };

        setContentParts(parseContent(post.body));
    }, [post.body]);

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.summary} />
            </Head>

            <section id="blog" className="mx-auto max-w-3xl py-10">
                <div className="flex items-center justify-start gap-4">
                    <Link
                        href="/blog"
                        className="group mb-6 inline-flex items-center gap-1 rounded-lg border border-orange-900 px-2 py-1 text-sm text-orange-900 transition-colors hover:text-orange-900 dark:border-orange-500 dark:text-orange-500 dark:hover:text-orange-300"
                    >
                        <ChevronLeft className="size-3 transition-transform group-hover:-translate-x-px" />
                        Back to Blog
                    </Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl leading-tight font-semibold tracking-tighter text-orange-500 dark:text-orange-900 dark:md:text-4xl">
                        {post.title}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-orange-300">
                        {post.published_at}
                    </p>
                </div>

                <div className="my-6 flex w-full items-center">
                    <div
                        className="h-px flex-1 bg-orange-900"
                        style={{
                            maskImage:
                                'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
                            WebkitMaskImage:
                                'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
                        }}
                    />
                </div>

                {post.cover_image && (
                    <div className="mb-8 aspect-video w-full rounded-2xl border border-orange-500 object-cover dark:border-orange-900">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full rounded-2xl border border-orange-300 object-cover dark:border-orange-900"
                        />
                    </div>
                )}

                <article className="prose max-w-full leading-relaxed text-pretty prose-zinc dark:prose-invert [&_a]:text-orange-600 [&_a]:hover:text-orange-800 dark:[&_a]:text-orange-400 dark:[&_a]:hover:text-orange-300 [&_blockquote]:border-orange-500 [&_blockquote]:text-gray-700 dark:[&_blockquote]:border-orange-400 dark:[&_blockquote]:text-gray-300 [&_code]:rounded [&_code]:bg-orange-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-orange-800 dark:[&_code]:bg-orange-900/30 dark:[&_code]:text-orange-300 [&_h1]:text-orange-900 dark:[&_h1]:text-orange-400 [&_h2]:text-orange-800 dark:[&_h2]:text-orange-500 [&_h3]:text-orange-700 dark:[&_h3]:text-orange-500 [&_h4]:text-orange-600 dark:[&_h4]:text-orange-400 [&_hr]:border-orange-200 dark:[&_hr]:border-orange-800 [&_li]:text-gray-700 dark:[&_li]:text-gray-300 [&_p]:text-gray-700 dark:[&_p]:text-gray-300 [&_pre]:bg-gray-900 dark:[&_pre]:bg-gray-950 [&_strong]:text-orange-800 dark:[&_strong]:text-orange-300">
                    {hydrated ? (
                        contentParts.map((part, index) => {
                            if (part.type === 'code') {
                                return (
                                    <CodeBlock
                                        key={index}
                                        code={part.code}
                                        language={part.language}
                                    />
                                );
                            }

                            if (part.type === 'html') {
                                return (
                                    <div
                                        key={index}
                                        dangerouslySetInnerHTML={{
                                            __html: part.content,
                                        }}
                                    />
                                );
                            }

                            return null;
                        })
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    )}
                </article>

                {/* POST NAVIGATION */}
                <nav className="mt-12 pt-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        {/* Previous Post */}
                        {post.previous_post ? (
                            <Link
                                href={`/blog/${post.previous_post.slug}`}
                                className="group flex flex-1 flex-col gap-1 rounded-lg border border-orange-200 p-4 transition-colors hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20"
                            >
                                <span className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                                    <ChevronLeft className="size-3" />
                                    Previous
                                </span>
                                <span className="text-sm font-medium whitespace-normal text-gray-700 transition-colors group-hover:text-orange-800 dark:text-gray-300 dark:group-hover:text-orange-400">
                                    {post.previous_post.title}
                                </span>
                            </Link>
                        ) : (
                            <div className="flex-1" />
                        )}

                        {/* Next Post */}
                        {post.next_post ? (
                            <Link
                                href={`/blog/${post.next_post.slug}`}
                                className="group flex flex-1 flex-col gap-1 rounded-lg border border-orange-200 p-4 text-right transition-colors hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20"
                            >
                                <span className="flex items-center justify-end gap-1 text-xs text-orange-600 dark:text-orange-400">
                                    Next
                                    <ChevronRight className="size-3" />
                                </span>
                                <span className="text-sm font-medium whitespace-normal text-gray-700 transition-colors group-hover:text-orange-800 dark:text-gray-300 dark:group-hover:text-orange-400">
                                    {post.next_post.title}
                                </span>
                            </Link>
                        ) : (
                            <div className="flex-1" />
                        )}
                    </div>
                </nav>
            </section>
            <ContactSection />
        </>
    );
}
