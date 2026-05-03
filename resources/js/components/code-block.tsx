import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export default function CodeBlock({
    code,
    language = 'javascript',
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative my-4">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 z-10 cursor-pointer rounded-md bg-gray-800/90 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-gray-700 focus:opacity-100"
            >
                {copied ? (
                    <span className="flex items-center gap-1">
                        <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            height="auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Copiado
                    </span>
                ) : (
                    <span className="flex items-center gap-1">
                        <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            height="auto"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                            />
                        </svg>
                        Copiar
                    </span>
                )}
            </button>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    padding: '1rem',
                }}
                showLineNumbers={true}
            >
                {code.trim()}
            </SyntaxHighlighter>
        </div>
    );
}
