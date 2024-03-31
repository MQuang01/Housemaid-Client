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

export const calculateEndTime = (startTime, totalTime) => {
    const timeStart = formatHHMMSinceMidnightToMinutes(startTime);
    const timeEnd = timeStart + formatHHMMSinceMidnightToMinutes(totalTime);

    let endHour = Math.floor(timeEnd / 60);
    let endMinute = timeEnd % 60;

    // Kiểm tra và điều chỉnh giờ và phút nếu cần
    if (endMinute >= 60) {
        endHour += Math.floor(endMinute / 60);
        endMinute %= 60;
    }

    let formattedEndHour = endHour.toString().padStart(2, '0');
    let formattedEndMinute = endMinute.toString().padStart(2, '0');

    if (endHour >= 24) {
        formattedEndHour = (endHour - 24).toString().padStart(2, '0');
    }

    // console.log(`${formattedEndHour}:${formattedEndMinute}`)
    return `${formattedEndHour}:${formattedEndMinute}`;
};

export const formatDateString = "YYYY-MM-DD";