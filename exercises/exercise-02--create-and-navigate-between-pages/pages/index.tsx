import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home page!</h1>
      <Link href="/about">About</Link>
    </div>
  )
}

export default Home
