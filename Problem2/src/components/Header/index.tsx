import logo from './logo.png'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-[#002000] text-white py-3">
      <div className="flex items-center space-x-2 text-green-400 font-bold text-lg">
        <img src={logo} alt="Exchange System Logo" className="h-12" />
      </div>
    </header>
  )
}
