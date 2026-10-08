import React from 'react'
import { useSearchParams } from 'react-router';

export const useHandleSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //?Queries parameters opcionales

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>, inputRef: React.RefObject<HTMLInputElement | null>) => {
    if (event.key === "Enter") {
      const query = inputRef.current?.value || "";
      const newSearchParams = new URLSearchParams();
      if (!query) {
        newSearchParams.delete('query')
      } else {
        newSearchParams.set("query", query)
      }
      setSearchParams(newSearchParams)
    }
  }
  return {
    searchParams,
    handleSearch
  }
}
