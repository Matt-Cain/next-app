export const getCurrentMonthNumber = () => {
  const date = new Date();
  return date.getMonth();
};

export const getCurrentYearNumber = () => {
  const date = new Date();
  return date.getFullYear();
};

export const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString('default', { month: 'long' });
};

export const getWeeksInMonth = (month, year) => {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstSunday = new Date(firstDay);

  firstSunday.setDate(1 - firstSunday.getDay());

  while (firstSunday <= lastDay) {
    const startDate = new Date(firstSunday);
    const endDate = new Date(firstSunday);
    endDate.setDate(endDate.getDate() + 6);

    weeks.push({ startDate, endDate });

    firstSunday.setDate(firstSunday.getDate() + 7);
  }

  return weeks;
};

const abbreviateDate = (date) => {
  const options = { month: 'short', day: '2-digit' };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.format(date);

  return formattedDate;
};

export const formatRange = ({ startDate, endDate }) => {
  const start = abbreviateDate(startDate);
  const end = abbreviateDate(endDate);

  return `${start} - ${end}`;
};
