import React, {useState} from 'react'
import style from "./Paginator.module.scss";
import {PaginatorPropsType} from "./types";

export const Paginator = ({
                            totalItemsCount,
                            pageSize,
                            currentPage,
                            onPageChanged,
                            portionSize = 10
                          }: PaginatorPropsType) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={style.paginator}>
      {portionNumber > 1 &&
          <button onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}>◀</button>
      }

      {pages
        .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
        .map((page) => {
          return (
            <span
              key={page}
              className={(currentPage) === page ? style.selectedPage : ""}
              onClick={() => {
                onPageChanged(page)
              }}>{page}
                    </span>)
        })}
      {portionCount > portionNumber &&
          <button onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}>▶</button>
      }
    </div>
  )
}
