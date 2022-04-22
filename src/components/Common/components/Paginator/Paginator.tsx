import React, {useState} from 'react'
import s from "./Paginator.module.scss";


export const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}: PaginatorPropsType) => {

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
        <div className={s.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>◀</button>
            }

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span
                        key={p}
                        className={(currentPage) === p ? s.selectedPage : ""}
                        onClick={(e) => {
                            onPageChanged(p)
                        }}
                    >{p}</span>
                })}
            {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>▶</button>
            }
        </div>
    )
}

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    onPageChanged: (pageNumber: number) => void
}
