/**
 * 设置缓存
 * @param {string} key 缓存key
 * @param {Object} value 需要存储的缓存值
 * @param {number} expire 过期时间，默认0表示永久有效
 */
export const setCache = (key, value, expire = 0) => {
    let obj = {
        data: value, //存储的数据
        time: Date.now() / 1000, //记录存储的时间戳
        expire: expire //记录过期时间，单位秒
    }
    uni.setStorageSync(key, JSON.stringify(obj))
}

/**
 * 获取缓存
 * @param {string} key
 */
export const getCache = (key) => {
    let val = uni.getStorageSync(key)
    if (!val) {
        return null
    }
    val = JSON.parse(val)
    if (val.expire && Date.now() / 1000 - val.time > val.expire) {
        uni.removeStorageSync(key)
        return null
    }
    return val.data
}

/**
 * 删除缓存
 * @param { string } key 缓存key
 */
export const delCache = (key) => {
    uni.removeStorageSync(key)
}
