export const formatDate = (date: Date): string => {
    // returns a formatted date string -> format: "DD/MM/YYYY HH:MM"
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}