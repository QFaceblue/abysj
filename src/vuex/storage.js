//封装操作localstorage本地存储的方法   模块化的文件
//使用直接引用，作用域为session
// nodejs  基础

var storage={

    set(key,value){

        localStorage.setItem(key, JSON.stringify(value));//存储字符串对
    },
    get(key){

        return JSON.parse(localStorage.getItem(key));//解析返回对象
    },
    remove(key){
        localStorage.removeItem(key);
    }

}

export default storage;


