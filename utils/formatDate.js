const handlebars = require('handlebars');

// Define the formatDate helper
handlebars.registerHelper('formatDate', function (date, format) {
  // Create a new Date object from the provided date string
  const formattedDate = new Date(date);

  // Define formatting options (you can customize this as needed)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  // Format the date according to the options
  return formattedDate.toLocaleDateString(undefined, options);
});