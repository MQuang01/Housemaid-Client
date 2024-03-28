import {formatHHMMSinceMidnightToMinutes} from "./FormatTime";

export const AMOUNT_TYPE = {
    "Quantity" : 10,
    "Size" : 5000
}

export const compareTime = (time1, time2) => {
    const time1Minutes = formatHHMMSinceMidnightToMinutes(time1);
    const time2Minutes = formatHHMMSinceMidnightToMinutes(time2);
    return time1Minutes - time2Minutes;
}