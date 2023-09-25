module.exports = {
  format_date: (date) => {
    if (!date) return ""; // Handle the case when date is undefined

    // Ensure date is a Date object
    const formattedDate = date instanceof Date ? date : new Date(date);

    // Format date as MM/DD/YYYY
    return formattedDate.toLocaleDateString();
  },
};
