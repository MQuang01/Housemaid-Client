export const formatMinutesToHHMM = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
};
export const formatMinutesToDetail = (totalMinutes) => {
    // 185 => 2h 5 phút
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) {
        return `${minutes} phút`;
    }
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours} tiếng ${formattedMinutes} phút`;
}

export const formatHHMMSinceMidnightToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export const parseTimeString = (timeString) =>{

    // Tách chuỗi thành giờ và phút
    const parts = timeString.split(":");

    // Chuyển đổi các phần tử từ chuỗi sang số nguyên
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);

    // Tạo đối tượng Date mới
    const parsedTime = new Date();

    parsedTime.setHours(hours);
    parsedTime.setMinutes(minutes);

    // Lấy giờ và phút từ đối tượng Date đã parse
    const parsedHours = parsedTime.getHours();
    const parsedMinutes = parsedTime.getMinutes();

    // Tạo chuỗi giờ và phút với định dạng "hh:mm"
    // console.log(parsedTime);
    return `${parsedHours}:${parsedMinutes < 10 ? '0' : ''}${parsedMinutes}`;
}

export const formatYYYYMMDDToDDMMYYYY = (date) =>{
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`
}

export const getTimeNow = () =>{
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`
}

export function sumTime(time1, time2) {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);

    let totalHour = hour1 + hour2;
    let totalMinute = minute1 + minute2;

    if (totalMinute >= 60) {
        totalHour += Math.floor(totalMinute / 60);
        totalMinute = totalMinute % 60;
    }

    return `${totalHour}:${totalMinute < 10 ? '0' : ''}${totalMinute}`;
}

export const compareTimeString = (dateString) =>{
    const date1 = new Date();
    const date2 = new Date(dateString);

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    // So sánh các đối tượng Date
    return date1 - date2;
}

export const parseTimeToMinutes = (time) =>{
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

export const newTomorrow = () =>{
    const today = new Date(); // Lấy ngày và giờ hiện tại
    const tomorrow = new Date(today); // Tạo một bản sao của ngày hiện tại
    tomorrow.setDate(today.getDate() + 1); // Thêm 1 vào phần ngày của bản sao

// Lấy ngày, tháng và năm của ngày hôm sau
    const tomorrowDay = tomorrow.getDate();
    const tomorrowMonth = tomorrow.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const tomorrowYear = tomorrow.getFullYear();

    return `${tomorrowYear}-${tomorrowMonth < 10 ? '0' : ''}${tomorrowMonth}-${tomorrowDay < 10 ? '0' : ''}${tomorrowDay}`
}