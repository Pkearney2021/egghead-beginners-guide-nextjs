# Exercise 09: Create custom Layouts

## Background

React's composable nature allows us to create reusable components. Layouts are exactly that! In [Exercise 05](../exercise-05--override-the-app-component) we learned what's the `App` component and how to override it. So, if we had a custom layout and wanted to use it, the `App` component is where we should start.

In Next.js there are two ways that you can define a custom layout:
- [Single Shared Layout](#single-shared-layout)
- [Per-Page Layouts](#per-page-layouts)

## Single Shared Layout

A Single Shared Layout in Next.js is a custom layout that's used by every page in our app. Let's say our app is simple, and every page has a `navbar` and a `footer`. We can define our layout like so:

```typescript
// src/components/layout/index.tsx

import type { ReactNode } from 'react'

import Navbar from './navbar'
import Footer from './footer'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer/>
    </>
  )
}

export default Layout
```

In order to use this custom layout, we can wrap the `Component` component in our `_app.tsx` file:

```typescript
// pages/_app.tsx

import type { AppProps } from 'next/app'

import Layout from 'src/components/layout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
```

Since the `Layout` component is reused when changing pages, its component state will be preserved.

## Per-Page Layouts

If we want to have multiple layouts (ex. authentication, dashboard, settings etc...), we can define a `getLayout` property to our pages that will receive the page in `props`, and wrap it in the layout that we want. Since we're returning a function, we can have complex nested layouts if we wanted to.

Here's an example of a page:

```typescript
// pages/index.tsx

import type { ReactElement } from 'react'

import Layout from 'src/components/layout'
import NestedLayout from 'src/components/nested-layout'

const Page = () => {
  return (
    // Our page's content...
  )
}

Page.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  )
}

export default Page
```

In order to use this, we need to make some changes in our `_app.tsx`:

```typescript
// pages/_app.tsx

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

type NextPageWithLayout = NextPage & {
  // define the getLayout method for every page
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  // override the default Component definition
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // use the getLayout defined in each page
  // if it doesn't exist, provide a fallback
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default App
```

> Have in mind that the Custom Layouts are not considered as Pages, so the only way to fetch data is on the client-side.

That's how we can setup a simple mechanism for custom per-page layouts.

## 🚀 Exercise

Create a single shared layout that adds a navigation bar and a footer to each of our pages.

## ⭐️ Challenge

Implement the mechanism that allows you to specify which layout is going to be rendered in each page separately.

## 🍩 Exercise Feedback form

Writing down what you learn is key to your retention. Also, I want to make sure each exercise is effective at helping you learn the material. Please quickly fill out [this form](https://docs.google.com/forms/d/e/1FAIpQLSeKPJV5UInaNFlZawN7vZdNyPngyinrkp7eoQO0vzwGzh2EtQ/viewform?usp=pp_url&entry.651170566=Exercise+09+-+Create+custom+Layouts) so you can elaborate on what you learned and give me feedback so I can improve it for future learners.