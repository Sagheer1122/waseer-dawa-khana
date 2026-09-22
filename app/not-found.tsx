import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-cream-50">
      <div className="space-y-4 max-w-md">
        <span className="text-6xl font-serif font-bold text-forest">404</span>
        <h1 className="text-2xl font-serif font-bold text-earth-800">
          Page Not Found
        </h1>
        <p className="text-sm font-sans text-earth-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-forest text-ivory text-xs font-sans font-bold uppercase tracking-widest hover:bg-forest-700 transition-colors shadow-sm"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
