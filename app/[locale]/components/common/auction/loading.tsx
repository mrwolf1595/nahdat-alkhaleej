export default function Loading() {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading auctions...</h2>
        <p className="text-gray-500 mt-2">Please wait while we fetch the latest properties</p>
      </div>
    );
  }