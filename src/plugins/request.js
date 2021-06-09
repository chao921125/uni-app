const baseUrl = 'https://unidemo.dcloud.net.cn';
const defaultHeader = {};
const request = (url = '', date = {}, type = 'GET', header = {}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            data: date,
            header: Object.assign(defaultHeader, header),
            method: type,
            timeout: 60000,
            dataType: 'json',
            success: (res) => {
                console.log(res.data);
                this.text = 'request success';
            },
            fail: (err) => {
                console.log(err);
                this.text = 'request error';
            }
        });
    });
}

export default request;
