/*
 * page管理
 * */
var page = {
    setCurrentPage: function(page){
        this.page = page;
    },
    getCurrentPage: function(){
        return this.page;
    },
};
module.exports = page;