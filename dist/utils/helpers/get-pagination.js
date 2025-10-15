"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const const_1 = __importDefault(require("../const"));
const getPagination = ({ count, pageRequest, limitRequest }) => {
    let totalPage = 1;
    let links = [1];
    let nextPage = null;
    let prevPage = null;
    let page = const_1.default.paginationConst.DEFAULT_PAGE;
    let limit = const_1.default.paginationConst.DEFAULT_LIMIT;
    if (pageRequest)
        page = Number(pageRequest);
    if (limitRequest && limitRequest <= "20")
        limit = Number(limitRequest);
    let currentPage = page;
    totalPage = Math.ceil(count / limit);
    nextPage = page > 0 && page < totalPage ? page + 1 : null;
    prevPage = page > 1 ? page - 1 : null;
    links = Array.from({ length: totalPage }, (_, index) => index + 1);
    return { totalPage, links, nextPage, prevPage, page, limit, currentPage };
};
exports.getPagination = getPagination;
//# sourceMappingURL=get-pagination.js.map