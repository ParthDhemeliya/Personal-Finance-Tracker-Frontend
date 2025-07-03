interface PaginationProps {
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({
  total,
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const isFirst = page === 1;
  const isLast = page === totalPages;
  console.log(total);
  const generatePageButtons = () => {
    const buttons = [];
    const range = 2;
    const start = Math.max(1, page - range);
    const end = Math.min(totalPages, page + range);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`cursor-pointer px-3 py-1 rounded-md transition text-sm font-medium shadow-sm border border-blue-200 hover:bg-blue-100
            ${i === page ? "bg-blue-600 text-white" : "bg-white text-blue-600"}
          `}
        >
          {i}
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div className="flex justify-end mt-6 gap-2 items-center">
      <button
        disabled={isFirst}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>

      {generatePageButtons()}

      <button
        disabled={isLast}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
