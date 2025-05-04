import { BrowserRouter, Route, Routes } from 'react-router'
import { NotFound } from './pages/404'
import Home from './pages/home'
import Layout from './pages/layout'
import { Redirect } from './pages/redirect'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/:url-encurtada" element={<Redirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
