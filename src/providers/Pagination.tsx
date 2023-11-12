import { Dispatch, ReactNode, createContext, useEffect, useState } from 'react';

const INITIAL_LIMIT = 5;

interface Pagination {
    limit: number;
    offset: number;
    pages: number[];
    page: number;
    onLimitChange: Dispatch<number>;
    onOffsetChange: Dispatch<number>;
    onPageChange: Dispatch<number>;
}

export const PaginationState = createContext<Pagination>({
    limit: INITIAL_LIMIT,
    offset: 0,
    pages: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    page: 0,
    onLimitChange: () => {},
    onOffsetChange: () => {},
    onPageChange: () => {},
});

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const [offset, setOffset] = useState(0);
    const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [page, setPage] = useState(pages[0]);

    useEffect(() => {
        setOffset(0);
        setPage(0);
    }, [limit]);

    return (
        <PaginationState.Provider
            value={{
                limit,
                offset,
                pages,
                page,
                onLimitChange: setLimit,
                onOffsetChange: setOffset,
                onPageChange: setPage,
            }}
        >
            {children}
        </PaginationState.Provider>
    );
};
