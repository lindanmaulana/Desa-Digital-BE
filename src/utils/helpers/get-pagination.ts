import paginationConst from "../const/pagination.const";

interface getPaginationParams {
	count: number;
	pageRequest: string | undefined
	limitRequest: string | undefined
}

export const getPagination = ({ count, pageRequest, limitRequest }: getPaginationParams) => {
	let totalPage: number = 1;
	let links: number[] = [1];
	let nextPage: number | null = null;
	let prevPage: number | null = null;

	let page: number = paginationConst.DEFAULT_PAGE;
	let limit: number = paginationConst.DEFAULT_LIMIT;

	if (pageRequest) page = Number(pageRequest);
	if (limitRequest && limitRequest <= "20") limit = Number(limitRequest);

	let currentPage: number = page;

	totalPage = Math.ceil(count / limit);
	nextPage = page > 0 && page < totalPage ? page + 1 : null;
	prevPage = page > 1 ? page - 1 : null;
	links = Array.from({ length: totalPage }, (_, index) => index + 1);

	return { totalPage, links, nextPage, prevPage, page, limit, currentPage };
};
