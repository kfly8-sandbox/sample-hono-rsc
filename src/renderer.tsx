import { rscRenderer } from './rsc-renderer'

export const renderer = rscRenderer(
  ({ children }) => {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Hono RSC Demo</title>
          <link
            href={import.meta.env.PROD ? `/assets/style.css` : `/src/style.css`}
            rel="stylesheet"
          />
          <script type="module" src={import.meta.env.PROD ? `/assets/client.js` : `/src/client.tsx`} />
        </head>
        <body id="app">{children}</body>
      </html>
    )
  },
  {
    nonce: !import.meta.env.NO_CSP ? crypto.randomUUID() : undefined,
    // `unsafe-eval` is required during dev since React uses eval for findSourceMapURL feature
    unsafeEval: import.meta.env.NODE_ENV !== 'production',
  }
)
