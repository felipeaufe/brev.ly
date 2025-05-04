import LinkList from './link-list'
import NewLink from './new-link'

const Home = () => {
  return (
    <div className="flex gap-5 w-full flex-col md:flex-row items-start justify-center">
      <NewLink />
      <LinkList />
    </div>
  )
}

export default Home
