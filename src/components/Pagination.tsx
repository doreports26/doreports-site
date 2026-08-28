import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g., "/category/entertainment"
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-12 mb-8">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link 
          href={`${basePath}?page=${currentPage - 1}`}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#004a99] hover:border-[#004a99] hover:bg-blue-50 transition-all mr-2"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-100 text-gray-300 mr-2 cursor-not-allowed">
          <ChevronLeft className="w-5 h-5" />
        </div>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <div key={`ellipsis-${index}`} className="flex items-center justify-center w-10 h-10 text-gray-400">
              <MoreHorizontal className="w-4 h-4" />
            </div>
          );
        }

        const isCurrent = page === currentPage;
        return (
          <Link
            key={`page-${page}`}
            href={`${basePath}?page=${page}`}
            className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all ${
              isCurrent
                ? "bg-[#004a99] text-white shadow-md"
                : "border border-gray-200 text-gray-600 hover:text-[#004a99] hover:border-[#004a99] hover:bg-blue-50"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link 
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-[#004a99] hover:border-[#004a99] hover:bg-blue-50 transition-all ml-2"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-100 text-gray-300 ml-2 cursor-not-allowed">
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
