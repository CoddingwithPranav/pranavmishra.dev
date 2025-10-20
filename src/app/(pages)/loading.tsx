export default function Loading() {
  // Or a custom loading skeleton component
  return <div className="min-h-screen flex flex-col z-20 relative justify-center gap-7 items-center">
    <div className="loader"></div>
    <span className="text-secondary text-xl">Loading...</span>
  </div>
}