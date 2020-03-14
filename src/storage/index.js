const STORAGE_KEY = 'mall'

export default {
  // 往同一级添加值/模块内增加值
  setItem(key, value, module_name) {
    if (module_name) {
      let val = this.getItem(module_name)
      if (val) val[key] = value
      this.setItem(module_name, val)
    } else {
      let val = this.getStorage()
      val[key] = value
      return window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
  },
  // 获取值-获取某个模块中key值
  getItem(key, module_name) {
    if (module_name) {
      let val = this.getItem(module_name)
      if (val) return val[key]
    }
    return this.getStorage()[key]
  },
  // 获取整个对象
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  },
  clear(key, module_name) {
    let val = this.getStorage()
    if (module_name) {
      // 不存在值的时候
      if (!val[module_name]) return
      delete val[module_name][key]
    } else {
      delete val[key]
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}