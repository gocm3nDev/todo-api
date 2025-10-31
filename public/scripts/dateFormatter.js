exports.formatDate = (inputDate) => { // ex. Wed Oct 29 2025 01:43:08 GMT+0300 (GMT+03:00)
    const dateObj = new Date(inputDate);

    const formatted = new Intl.DateTimeFormat('en-EN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(dateObj);

    return formatted;
}