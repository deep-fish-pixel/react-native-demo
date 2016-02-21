/*
 * xhr的ajax经典用法封装，用法同zept.ajax
 * 若该模块作为util的工具模块使用，依赖util的工具集合，则需使用baseUtil模块，
 * 而非util模块，会出现模块相互嵌套问题
 * */
var ajax = function (options) {
    var get = 'GET',
        post = 'POST';
    options = Object.assign({
        type: get,
        data: {},
        dataType: 'text',
    }, options);
    //type统一大写
    options.type = options.type.toUpperCase();

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.HEADERS_RECEIVED) {
            if(options.start){
                options.start(0, xhr);
            }
        } else if (xhr.readyState === xhr.LOADING) {
            if(options.process){
                options.process(xhr.responseText.length, xhr);
            }
        } else if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                if(options.success){
                    options.success(getContent(), xhr);
                }
            } else{
                if(options.error){
                    options.error({
                        status: xhr.status,
                        responseText: xhr.responseText
                    }, xhr);
                }
            }
        }
    };
    if(options.type==get){
        //处理参数问题
        var params = '',
            value,
            data = options.data;
        for(var key in data){
            value = data[key];
            if(value !== null && value !== undefined){
                params += '&'+key+'='+value;
            }
        }
        if(options.url && options.url.indexOf('?')==-1){
            params = '?' + params.substring(1);
        }
        options.url += params;
    }
    xhr.open(options.type, options.url);
    xhr.send(options.type==post?options.data:undefined);

    function getContent(){
        if(options.dataType=='json'){
            return JSON.parse(xhr.responseText);
        }
        else{
            return xhr.responseText;
        }
    }
    return xhr;
}
module.exports = ajax;