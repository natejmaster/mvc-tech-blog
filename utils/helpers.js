module.exports = {
  format_date: (date) => {
    if (!date) return ""; // Handle the case when date is undefined

    // Ensure date is a Date object
    const formattedDate = date instanceof Date ? date : new Date(date);

    // Extract the year, month, day, hours, minutes, and seconds components
    const year = formattedDate.getFullYear().toString().slice(-2); // Get the last two digits of the year
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const hours = (formattedDate.getHours() % 12 || 12).toString().padStart(2, '0'); // Convert to 12-hour format
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
    const seconds = formattedDate.getSeconds().toString().padStart(2, '0');

    // Format the date as hh:mm:ss mm/dd/yy
    return `${hours}:${minutes}:${seconds} ${month}/${day}/${year}`;
  }
};
