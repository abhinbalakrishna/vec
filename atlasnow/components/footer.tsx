'use client'

export default function Footer(){
  return (
    <footer className="p-4 bg-gray-900 text-white mt-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  )
}
