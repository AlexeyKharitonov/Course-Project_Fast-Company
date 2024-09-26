export function displayDate(data) {
    const date = new Date(parseInt(data));
    const dateNow = new Date();

    const addZero = (number) => {
        if (number < 10) number = `0${number}`;
        return number;
    };

    const yearDiff = dateNow.getFullYear() - date.getFullYear();
    if (yearDiff === 0) {
        const dayDiff = dateNow.getDay() - date.getDay();
        if (dayDiff === 0) {
            const hoursDiff = dateNow.getHours() - date.getHours();
            if (hoursDiff === 0) {
                const minutesDiff = dateNow.getMinutes() - date.getMinutes();
                if (minutesDiff >= 0 && minutesDiff < 5) return "1 мин назад";
                if (minutesDiff >= 5 && minutesDiff < 10) return "5 мин назад";
                if (minutesDiff >= 10 && minutesDiff < 30) {
                    return "10 мин назад";
                }
                return "30 мин назад";
            }
            return `сегодня в ${addZero(date.getHours())}:${addZero(
                date.getMinutes()
            )}`;
        }
        return `${addZero(date.getDate())} ${date.toLocaleString("default", {
            month: "long"
        })}`;
    }
    return (
        addZero(date.getDate()) +
        "." +
        addZero(date.getMonth() + 1) +
        "." +
        date.getFullYear()
    );
}
