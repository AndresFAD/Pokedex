type PageItem = number | "...";

const getPageItems = (current: number, total: number): PageItem[] => {
  const delta = 2;
  const middle: number[] = [];

  for (
    let page = Math.max(2, current - delta);
    page <= Math.min(total - 1, current + delta);
    page++
  ) {
    middle.push(page);
  }

  const items: PageItem[] = [1];
  if (middle[0] > 2) items.push("...");
  items.push(...middle);
  if (middle[middle.length - 1] < total - 1) items.push("...");
  if (total > 1) items.push(total);

  return items;
};

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: Props) => {
  if (totalPages <= 1) return null;

  const navButtonClass =
    "min-w-[2.5rem] h-10 px-3 rounded-full bg-white border border-gray-200 shadow-sm font-medium text-sm text-gray-700 hover:border-red-300 hover:text-red-600 hover:shadow-md transition disabled:opacity-40 disabled:pointer-events-none";

  return (
    <nav className="flex justify-center items-center gap-2 my-10 flex-wrap">
      <button
        type="button"
        disabled={disabled || currentPage === 1}
        onClick={() => onPageChange(1)}
        className={navButtonClass}
      >
        « Primera
      </button>
      <button
        type="button"
        disabled={disabled || currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={navButtonClass}
      >
        ‹
      </button>

      {getPageItems(currentPage, totalPages).map((item, index) =>
        item === "..." ? (
          <span key={`ellipsis-${index}`} className="px-1 text-gray-400">
            …
          </span>
        ) : (
          <button
            type="button"
            key={item}
            disabled={disabled}
            onClick={() => onPageChange(item)}
            className={
              item === currentPage
                ? "min-w-[2.5rem] h-10 px-3 rounded-full bg-red-600 text-white font-semibold text-sm shadow-sm"
                : navButtonClass
            }
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        disabled={disabled || currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={navButtonClass}
      >
        ›
      </button>
      <button
        type="button"
        disabled={disabled || currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        className={navButtonClass}
      >
        Última »
      </button>
    </nav>
  );
};
