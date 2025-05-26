import { rscRenderer } from './rsc-renderer'

export const renderer = rscRenderer(
  ({ children }) => {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Hono RSC Demo</title>
        </head>
        <body id="app">{children}</body>
      </html>
    )
  },
  {
    // `unsafe-eval` is required during dev since React uses eval for findSourceMapURL feature
    unsafeEval: import.meta.env.DEV,
  }
)
