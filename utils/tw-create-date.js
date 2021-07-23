module.exports = () => {
    const options = {
        year: "2-digit",
        month:"2-digit",
        day:"2-digit",
        hour:  "2-digit",
        minute: "2-digit",
        second: "2-digit"
     }
    const createTime =  new Date().toLocaleDateString('zh-tw', options);
    return createTime;
}