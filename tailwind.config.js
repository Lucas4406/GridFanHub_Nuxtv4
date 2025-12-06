/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{vue,js,ts}",
        "./index.html",
    ],
    theme: {
        extend: {
            colors: {
                f1red: '#e10600',
            },
            typography: {
                f1: {
                    css: {
                        '--tw-prose-body': '#d1d5db',
                        '--tw-prose-headings': '#fff',
                        '--tw-prose-bold': '#fff',
                        '--tw-prose-links': '#ef4444',
                        '--tw-prose-hr': '#4b5563',

                        h1: {
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            marginTop: '1.5rem',
                            marginBottom: '1rem',
                        },
                        h2: {
                            fontSize: '1.9rem',
                            fontWeight: '700',
                            marginTop: '2rem',
                            marginBottom: '1rem',
                            borderBottom: '1px solid #333',
                            paddingBottom: '0.3rem',
                        },
                        h3: {
                            fontSize: '1.4rem',
                            fontWeight: '600',
                            marginTop: '1.5rem',
                            marginBottom: '0.5rem',
                        },
                        p: {
                            marginTop: '0.75rem',
                            marginBottom: '0.75rem',
                            lineHeight: '1.75',
                        },
                        ul: {
                            marginTop: '1rem',
                            marginBottom: '1rem',
                        },
                    },
                },
            },
        },
    },
  plugins: [],
}

