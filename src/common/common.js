export function pageTo(path){
    this.$router.push({path});
}
export function timestampToTime(time){
    var date = new Date(time * 1000);
    var year = date.getFullYear() + '-';
    var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    return year + month + day;
}