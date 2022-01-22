import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h2>My favorite music genres:</h2>
      <ul>
        <li>
          <Link href="/rock/Axel">Rock</Link>
        </li>
        <li>
          <Link href="/country/Woody">Country</Link>
        </li>
        <li>
          <Link href="/pop/noidea">Pop</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
