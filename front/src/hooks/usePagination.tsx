import { useState } from 'react'

interface PaginationContext {
  offset: number,
  limit: number,
  setOffset: (set: number) => void,
  setLimit: (set: number) => void
}

export const usePagination = (
  initLimit: number
): PaginationContext => {
  const [offset, setStateOffset] = useState(1)
  const [limit, setStateLimit] = useState(initLimit)

  const setOffset = (set: number) => setStateOffset(set)
  const setLimit = (set: number) => setStateLimit(set)

  return {
    offset,
    limit,
    setOffset,
    setLimit
  }
}

export const filterPagination = (
  offset: number,
  limit: number
) => (
  item: any, // eslint-disable-line
  index: number
) => (index < offset * limit) && (index >= offset * limit - limit)
