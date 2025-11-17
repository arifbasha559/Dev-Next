// components/MdxRenderer.js
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { useEffect, useState } from 'react'

// Define your custom components
const MDXComponents = {
    h1: ({ children, ...props }) => (
        <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight mt-10 mb-6 text-white"
            {...props}
        >
            {children}
        </h1>
    ),

    h2: ({ children, ...props }) => (
        <h2
            className="text-3xl md:text-4xl font-bold tracking-tight mt-12 mb-4 text-gray-100"
            {...props}
        >
            {children}
        </h2>
    ),

    h3: ({ children, ...props }) => (
        <h3
            className="text-2xl font-semibold mt-8 mb-3 text-gray-200"
            {...props}
        >
            {children}
        </h3>
    ),

    p: ({ children, ...props }) => (
        <p
            className="leading-7 text-gray-300 mb-5 text-[1.05rem]"
            {...props}
        >
            {children}
        </p>
    ),

    img: (props) => (
        <Image
            className="rounded-xl border border-white/10 shadow-lg my-8"
            alt={props.alt}
            width={900}
            height={500}
            {...props}
        />
    ),

    a: ({ children, ...props }) => (
        <a
            className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-400 transition-colors"
            {...props}
        >
            {children}
        </a>
    ),

    ul: ({ children, ...props }) => (
        <ul
            className="list-disc pl-6 space-y-2 border-transparent text-gray-300  marker:text-gray-500"
            {...props}
        >
            {children}
        </ul>
    ),

    ol: ({ children, ...props }) => (
        <ol
            className="list-decimal pl-6 space-y-2 text-gray-300 marker:text-gray-400"
            {...props}
        >
            {children}
        </ol>
    ),

    li: ({ children, ...props }) => (
        <li className="leading-7 text-gray-300 " {...props}>
            {children}
        </li>
    ),

    blockquote: (props) => (
        <blockquote
            className="border-l-4 border-blue-500 pl-6 py-1 my-6 text-gray-300 italic bg-white/5 rounded-r-lg"
            {...props}
        />
    ),

    code: ({ children, ...props }) => (
        <code
            className="px-2 py-1 rounded-md bg-black/40 text-pink-300 font-mono text-sm"
            {...props}
        >
            {children}
        </code>
    ),
    hr: (props) => (
        <hr
            className="my-8 border-t border-white/10"
            {...props}
        />
    ),

    pre: ({ children, ...props }) => (
        <pre
            className="bg-black/50 border border-white/10 p-4 rounded-xl overflow-x-auto my-6 text-sm shadow-lg"
            {...props}
        >
            {children}
        </pre>
    ),

    table: (props) => (
        <table
            className="w-full border-collapse my-8 text-gray-300"
            {...props}
        />
    ),

    th: (props) => (
        <th
            className="border border-white/10 px-4 py-2 bg-white/5 font-semibold"
            {...props}
        />
    ),

    td: (props) => (
        <td
            className="border border-white/10 px-4 py-2"
            {...props}
        />
    ),
};

export default function MdxRenderer({ markdownContent }) {
    const [mdxSource, setMdxSource] = useState(null)

    useEffect(() => {
        const processContent = async () => {
            try {
                // Serialize the markdown content
                const serialized = await serialize(markdownContent, {
                    mdxOptions: {
                        development: process.env.NODE_ENV === 'development',
                    },
                })
                setMdxSource(serialized)
            } catch (error) {
                console.error('Error processing MDX:', error)
            }
        }

        processContent()
    }, [markdownContent])

    if (!mdxSource) {
        return <div>Loading content...</div>
    }

    return (
        <div className="prose max-w-none">
            <MDXRemote {...mdxSource} components={MDXComponents} />
        </div>
    )
}