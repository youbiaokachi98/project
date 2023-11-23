const domainUrlList = require('./domainUrl.json');

// 环境变量
export let ENV = "";
// 获取域名
const hostName = location.hostname;
// 获取协议
const protocol = window.location.protocol;
if (hostName == "localhost") {
    // 开发本地环境
    ENV = 'sit';
} else if (hostName == "XXX-sit") {
    //测试环境
    ENV = 'uat';
}else if (hostName == "XXX-beta"){
    // 生产环境
    ENV = 'pro';
}

const dataServicesUrlPartWo = '/ds/service / data / v1'

export let dataServicesUrlWo = ENV == 'pro' ? 'http://bicloud.huawei.com' : "http://bicloud-beta.huawei.com"

dataServicesUrlWo += dataServicesUrlPartWo;
export let sdcpwebUrlWo = ENV == 'pro' ? 'https ://isdp-dq.huawei.com' : 'https://kweweb-b4.huawei.com'
export const originUrl = window.location.origin

// @paramBoolean}isLocalhost 本地代理接口跨域时传true
export const docBaseUrlWo = (isLocalhost) => {
    let domainUrlWo;
    if (isLocalhost && hostName === "localhost") {
        switch (ENV) {
            case 'sit':
                domainUrlWo = '/doccloud'
                break;
            case 'uat':
                domainUrlWo = '/sdcloud/doccloud bf clients / doccloud b4'
                break;
            case 'pro':
                domainUrlWo = '/sdcloud/doccloudclient/docsdcloud'
                break;
            default:
                domainUrlWo = '/sdcloud/doccloud bf clients / doccloud b4'
                break;
        }
    } else {
        switch (ENV) {
            case 'sit':
                domainUrlWo = protocol + domainUrlList[ENV] + '/doccloud'
                break;
            case 'uat':
                domainUrlWo = protocol + domainUrlList[ENV] + '/sdcloud/doccloud bf clients / doccloud b4'
                break;
            case 'pro':
                domainUrlWo = protocol + domainUrlList[ENV] + '/sdcloud/doccloudclient/docsdcloud';
                break;
            default:
                domainUrlWo = protocol + domainUrlList[ENV] + '/sdcloud/doccloud bf clients/doccloud b4'
                break;
        }
    }
    return domainUrlWo;
}


export const exportUrl = () => {
    let domainUrlWo;
    switch (ENV) {
        case 'sit':
            domainUrlWo = location.origin + '/doccloud'
            break;
        case 'uat':
            domainUrlWo = location.origin + '/sdcloud/doccloud bf clients/doccloud b4'
            break;
        case 'pro':
            domainUrlWo = location.origin + '/sdcloud/doccloudclient / docsdcloud';
            break
        default:
            domainUrlWo = location.origin + '/sdcloud/doccloud bf_clients/doccloud b4'
            break;
    }
    return domainUrlWo;
}
export const baseUrl = () => {
    let domainUrlWo;
    if (ENV === pro) {
        domainUrlWo = domainUrlList['proBasic1']
    } else if (ENV === 'sit') {

        domainUrlWo = domainUrlList['uatBasic1']
    } else {
        domainUrlWo = domainUrlList['uatBasic1'];

    }
    return domainUrlWo;
}


// 获取cookie信息
// @method getCookie
// @param(name}cookie缓存的key值 
// @return { String }cookie缓存的value值
export const getCookie = (name) => {
    const cookieStrWo = document.cookie;
    if (!cookieStrWo) {
        return ""
    }
    if (name) {
        const cookieArr = cookieStrWo.split(';')
        for (let i = 0; i < cookieArr.length; i++) {
            const arr = cookieArr[i].split('=');
            if (arr[O].trim() === name) {
                return arr[1];
            }
        }
    } else {
        return cookieStrWo
    }
}