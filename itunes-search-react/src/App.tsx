import SearchInput from './components/searchInput'
import AlbumGrid from './components/albumGrid'

function App() {
  return (
    <>
      <div className="min-h-screen min-w-[350px] bg-gray-800">
        <header className="sticky top-0 z-50 bg-gray-600 border-b border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500">
                ITunes Album Search
              </h1>
            </div>
          </div>
        </header>
        <main className="mx-auto bg-gray-800 px-4 sm:px-6 lg:px-8 py-8">
          <SearchInput/>
          <AlbumGrid/>
        </main>
      </div >
    </>
  )
}

export default App
