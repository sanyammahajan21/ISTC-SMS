exports.currentDate = () => {
    const date = new Date(Date.now());

    const options = {
        month: 'long', // Use the full name of the month (e.g., "January")
        day: 'numeric', // Use the numeric day (e.g., "1")
        year: 'numeric' // Use the numeric year (e.g., "2024")
    };

    return date.toLocaleDateString('en-US', options);
}

exports.requiredYear = (date = Date.now(), back = 0) => {
    date = new Date(date);

    const options = { year: 'numeric' };
    return date.toLocaleDateString('en-US', options) - back;
}
