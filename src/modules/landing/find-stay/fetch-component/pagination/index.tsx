import {
  generatePaginationNumbers,
  getPageCount,
  isNumber,
} from "@/lib/utils/formatHelp";
import React, { FC } from "react";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}
const PaginationIndex: FC<Props> = ({ page, setPage, total }) => {
  const pageCount = getPageCount(total, 10);
  const handlePaginate = (item: number) => {
    window.scrollTo({top: 310, left: 0, behavior: 'smooth' });
    setPage(item);
  };
  return (
    <div className="p-1 rounded-full border border-[#9847FE]">
      <ul className="flex">
        {generatePaginationNumbers(page, pageCount).map((item, i) =>
          isNumber(item) ? (
            <li
              className={`w-12 h-12 fw-600 circle place-center cursor-pointer dark:!text-white ${
                page === Number(item)
                  ? "bg-[#9847FE] text-white"
                  : "hover:text-prima "
              }`}
              onClick={() => handlePaginate(Number(item))}
              key={i}
            >
              {item}
            </li>
          ) : (
            item
          )
        )}
      </ul>
    </div>
  );
};

export default PaginationIndex;
