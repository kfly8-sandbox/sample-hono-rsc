import type { Context } from 'hono'
import type { MiddlewareHandler } from 'hono/types'
import React from 'react'
import * as RSC from "@hiogawa/vite-rsc/extra/rsc";

export interface Props {}

type RendererOptions = {
  nonce?: string
}

type BaseProps = {
  c: Context
  children: React.ReactElement
}

type ComponentProps = Props &
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BaseProps & { Layout: React.FC<Record<string, any> & { children: React.ReactElement }> }

const createRenderer =
  (
    c: Context,
    Layout: React.FC<{ children: React.ReactElement }>,
    component?: React.FC<ComponentProps>,
    options?: RendererOptions
  ) =>
  async (children: React.ReactElement, props?: Props) => {
    const node = component ? await component({ children, Layout, c, ...props }) : children

    const req = c.req.raw;
    const res = await RSC.renderRequest(req, node, options);

    return res;
  }


export const rscRenderer = (
  component?: React.FC<ComponentProps>,
  options?: RendererOptions
): MiddlewareHandler =>
  function rscRenderer(c, next) {
    const Layout = (c.getLayout() ?? React.Fragment) as React.FC<{
      children: React.ReactElement
    }>
    if (component) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      c.setLayout((props: any) => {
        return component({ ...props, Layout, c })
      })
    }

    c.setRenderer(createRenderer(c, Layout, component, options))
    return next()
  }


