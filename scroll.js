  
  
  useEffect(() => {
    if (!loaderRef.current) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !isLoadingRef.current) {
        isLoadingRef.current = true
        const nextPage = filterBy.page + 1
        dispatch({
          type: SET_FILTER_BY,
          filterBy: { ...filterBy, page: nextPage },
        })
        loadStays().finally(() => {           
          isLoadingRef.current = false
        })                         
      }
    })

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [filterBy])