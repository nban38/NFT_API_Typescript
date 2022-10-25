// 타임스탬프로 변환
function Unix_timestampConv()
{
    return Math.floor(new Date().getTime() / 1000);
}

// 타임스탬프 값을 년월일로 변환
function Unix_timestamp(t : number) {
    var date = new Date(t*1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth()+1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}