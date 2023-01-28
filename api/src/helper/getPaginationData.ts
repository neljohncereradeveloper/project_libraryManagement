const getPaginationData = (dataCount: number, page: number, take: number) => {
  const currentPage = page ? page : 1;
  const totalPages = Math.ceil(dataCount / take);
  const previousPage = page > 1 ? true : false;
  const nextPage = page < totalPages ? true : false;

  return { totalPages, currentPage, previousPage, nextPage };
};

export default getPaginationData;
