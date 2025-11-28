import {Outlet} from 'react-router-dom'
import {Navbar} from '../component/Navbar'

export const PublicLayout= () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 mt-20 md:p-0 md:mt-0">
        <Outlet />
      </main>
    </div>
  )
}