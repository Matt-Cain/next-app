export const getCurrentMonthNumber = () => {
  const date = new Date();
  return date.getMonth();
};

export const getMonthName = (monthNumber) => {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString('default', { month: 'long' });
};

export const getWeeksInMonth = (month, year = new Date().getFullYear()) => {
  // Initialize the date for the first day of the given month and year
  const date = new Date(year, month, 1);

  // Create an array to store the weeks
  const weeks = [];

  // Loop through the weeks in the month
  while (date.getMonth() === month) {
    // Get the start date of the current week (Sunday)
    const weekStart = new Date(date);

    // Go forward 6 days to get the end date (Saturday)
    date.setDate(date.getDate() + 6);
    const weekEnd = new Date(date);

    // Add the current week to the array
    weeks.push({
      startDate: weekStart,
      endDate: weekEnd,
    });

    // Move to the next week (next Sunday)
    date.setDate(date.getDate() + 1);
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
