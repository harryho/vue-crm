import { Entity } from "@/types";
export const DEFAULT_ROW_PER_PAGE = 10;

export function getDefaultPagination(): Pagination {
  return {
    page: 1,
    totalItems: 0,
    rowsPerPage: DEFAULT_ROW_PER_PAGE,
    pages: 0
  };
}


export function getPagination(items: Entity[]) {
  const totalItems = items ? items.length : 0;
  const pages = Math.ceil(totalItems / DEFAULT_ROW_PER_PAGE);
  return { totalItems, pages, page: 1, rowsPerPage: DEFAULT_ROW_PER_PAGE };
}
