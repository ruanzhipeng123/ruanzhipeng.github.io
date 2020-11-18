export function getTemplateTimeByDate(date, template) {
    let day = new Date(date)

    let TimeObj = {
        'Y+': day.getUTCFullYear(),
        '(M+)': day.getMonth() + 1,
        '(d+)': day.getDate(),
        '(h+)': day.getHours(),
        '(m+)': day.getMinutes(),
        '(s+)': day.getSeconds()
    }

    for (let key in TimeObj) {
        let reg = new RegExp(key)

        if (reg.test(template)) {
            let time = TimeObj[key]

            // 判断当前模板时间是 两位 还是 一位的
            // 如果是两位 个位数时间需要前面加零, 1 -> 01 
            // 如果是一位 不用加零操作
            if (RegExp.$1.length > 1) {
                time = time >= 10 ? time : '0' + time
            }
            template = template.replace(reg, time)
        }
    }

    return template
}