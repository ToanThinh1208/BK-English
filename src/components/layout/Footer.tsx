export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} BK English. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
