const convertTimestamp = (date) => {
    const d = new Date(date);
    return d.getTime();
}

const convertDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleString();
}

module.exports = {
    convertTimestamp,
    convertDate
}