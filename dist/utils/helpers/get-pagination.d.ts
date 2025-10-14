export interface getPaginationParams {
    count: number;
    pageRequest: string | undefined;
    limitRequest: string | undefined;
}
export declare const getPagination: ({ count, pageRequest, limitRequest }: getPaginationParams) => {
    totalPage: number;
    links: number[];
    nextPage: number | null;
    prevPage: number | null;
    page: number;
    limit: number;
    currentPage: number;
};
//# sourceMappingURL=get-pagination.d.ts.map