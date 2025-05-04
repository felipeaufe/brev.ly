import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <main className="bg-gray-200 w-screen min-h-screen flex justify-center py-8 px-3 md:pt-22">
      <Outlet />
    </main>
  )
}

export default Layout
