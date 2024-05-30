
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatName = (string: string, number: number) => {
  if (string.length > number) {
    return string.substring(0, number).concat("...");
  } else return string;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const formatNumber = (value: number | string) => {
  if (!value) return "";
  const val = Number(value);
  return `${val.toLocaleString("en-US").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatAsNgnMoney = (value: number | string, currency?: string) => {
  if (!value) return "";
  const val = Number(value);
  return `${currency || '$'}${val
    .toLocaleString("en-US")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatAsDollar = (value: number | string) => {
  if (!value) return "";
  const val = Number(value);
  return `$${val
    .toLocaleString("en-US")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const isNumber = (value: string | number) => {
  return typeof value === "number";
};

export const getPageCount = (count: number, limit: number) => {
  const pageCount = Math.ceil(count / limit);
  return pageCount;
};

export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  const pageRange = 2;
  const paginationNumbers = [];

  const showBreakIndicatorStart = currentPage > pageRange + 1;
  const showBreakIndicatorEnd = currentPage < totalPages - pageRange;

  for (let i = 1; i <= Math.min(pageRange, totalPages); i++) {
    paginationNumbers.push(i);
  }
  // Show break indicator if needed before the last two pages
  if (showBreakIndicatorStart && !showBreakIndicatorEnd) {
    paginationNumbers.push("...");
  }
  // Show the pages around the active page
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    if (i > pageRange && i < totalPages - pageRange + 1) {
      paginationNumbers.push(i); // Skip if the page was previously displayed
    }
  }
  // Show break indicator if needed after the first three pages
  if (showBreakIndicatorEnd && !showBreakIndicatorStart) {
    paginationNumbers.push("...");
  }
  // show last two pages
  if (totalPages > 3) {
    for (let i = Math.max(1, totalPages - 1); i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
  }
  return paginationNumbers;
};

export const removeDulicates = (data: string[]) => {
  return data.filter((value, index) => data.indexOf(value) === index);
};

export const formatStatus = {
  active: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-green-500"></span>
      <span className="syne fw-600 text-green-500">Active</span>
    </p>
  ),
  confirmed: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-green-500"></span>
      <span className="syne fw-600 text-green-500">Cofirmed</span>
    </p>
  ),
  draft: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-purple-500"></span>
      <span className="syne fw-600 text-purple-500">Undisclosed</span>
    </p>
  ),
  inactive: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-red-500"></span>
      <span className="syne fw-600 text-red-500">Inactive</span>
    </p>
  ),
  pending: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-[#fc819f]"></span>
      <span className="syne fw-600 text-[#fc819f]">Pending</span>
    </p>
  ),
  cancelled: (
    <p className="flex gap-x-2 items-center">
      <span className="w-3 h-3 block circle bg-red-500"></span>
      <span className="syne fw-600 text-red-500">Cancelled</span>
    </p>
  ),
};
