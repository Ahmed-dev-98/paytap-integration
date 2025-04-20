import { PayTabsButtonWithDetails } from './components/PayTabsButton'

function App() {
  return (
    <div className="min-h-screen w-[100vw] flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">💰 PayTabs Payment Demo</h1>
      <PayTabsButtonWithDetails />
    </div>
  </div>
  )
}

export default App
