/*
 * page管理
 * */
var page = {
    scrollEnabled: true,
    setScroll: function (flag) {
        flag = !!flag;
        if(flag === this.scrollEnabled){
            return;
        }
        this.scrollEnabled = flag;
        var page = this.page;
        if(page){
            page.setState({
                scrollEnabled: flag
            });
        }
    },
    setCurrentPage: function(page){
        this.page = page;
    },
    getCurrentPage: function(){
        return this.page;
    },
};
module.exports = page;