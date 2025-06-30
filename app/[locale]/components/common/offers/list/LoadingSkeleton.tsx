const LoadingSkeleton = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
          >
            <div className="h-64 w-full bg-gray-300"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-full mt-6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default LoadingSkeleton;
  