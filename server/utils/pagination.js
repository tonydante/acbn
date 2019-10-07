/**
 * @function pagination
 * @param {number} count
 * @param {number} limit
 * @param {number} offset
 * @returns {object} return an object with the page
 */
const pagination = (count, limit, offset) => {
  const page = Math.floor(offset / limit) + 1;
  const pageCount = Math.ceil(count / limit);
  const pageSize = (count - offset) > limit ? limit : (count - offset);
  return {
    page,
    pageCount,
    pageSize,
    count
  };
};
export const getDateToday = () => {
  let today = new Date();
  let dd = today.getDate(); // One day in the future
  let mm = today.getMonth()+1; //January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
      dd = `0${dd}`;
  }

  if (mm < 10) {
      mm = `0${mm}`
  }

  return `${dd}/${mm}/${yyyy}`;
};
export default pagination;
