/**
 * Created by zhangPeng on 2017/2/20.
 */
var GooFlowMode = function() {
    //基本配置，适用于流程专家配置
    this._initProperty = {
        "haveTool": true,
        "toolBtns": ["task round"]
    };
    this._remark = {
        "cursor": "选择指针",
        "direct": "结点连线",
        "task": "新建节点",
    };
    //当前的整体对象
    this._goolflow = null;
    //当前节点信息
    this._editNode = {};
    this._editNode.id = null;
    this._editNode.type = null;
    this._editNode.json = null;

    //初始换参数
    this._initParam = null;

    //

};

/**
 * @param  {[type]}
 * @return {[type]}
 */
GooFlowMode.prototype.init = function(initParam) {
    var pThis = this;
    pThis._initParam = initParam;

    //初始换配置版面
    this._initGoolflow(initParam);

    //绑定数据




    return pThis;
}

GooFlowMode.prototype._initGoolflow = function(initParam) {
    var pThis = this;
    //初始换配置
    var property = this._initProperty;
    var remark = this._remark;
    var goolflow = $.createGooFlow(initParam.target, property);
    goolflow.setNodeRemarks(remark);
    this._goolflow = goolflow;

    //初始化节点
    goolflow.loadData(initParam.nodeData);

    //添加节点之后回调方法
    goolflow.onItemAdd = function(id, type, json) {
        //当前节点信息
        //pThis._editNode.id = id;
        //pThis._editNode.type = type;
        //pThis._editNode.json = json;

        //console.log(json);

        //节点名字默认为"新建节点"
        pThis._onItemAddChangeName(json);

        if (pThis._initParam.callBack.onItemAddCallBack && typeof pThis._initParam.callBack.onItemAddCallBack === 'function') {
            pThis._initParam.callBack.onItemAddCallBack.apply(pThis);
        }


        return true;
    }

    //删除节点之后的回调方法
    goolflow.onItemDel = function(id, ype) {

        return true;
    }

    //移动节点之后的回调方法
    goolflow.onItemMove = function(id, type, left, top) {

        return true;
    }

    //由不选中变成选中时，触发的方法
    goolflow.onItemFocus = function(id, type) {
        //当前节点信息
        pThis._editNode.id = id;
        pThis._editNode.type = type;

        //开始结束节点隐藏删除
        if (false) {
            pThis._hideNodeDelIcon();
        }
        return true;
    }


    //由选中变成不选中时，触发的方法
    goolflow.onItemBlur = function(id, type) {
        //当前节点信息
        pThis._editNode.id = null;
        pThis._editNode.type = null;
        return true;
    }
}

//增加节点是名字相关修改
GooFlowMode.prototype._onItemAddChangeName = function(json) {
    json.name = '新建节点';
}

//获取当前节点
GooFlowMode.prototype._getActiveNode = function() {
    return $('#' + this._editNode.id);
}

//隐藏删除Icon
GooFlowMode.prototype._hideNodeDelIcon = function() {
    this._getActiveNode().find('div.rs_close').css({
        'display': 'none'
    });
}

//检查连线情况是否符合需求
GooFlowMode.prototype._checkFlowLines = function() {

    return true;
}

//getItemInfo





//--------------------------------------------------------------------------------------------------------------------------------------------------------
var goolflow;

$(document).ready(function() {
    var data = {};
    data.target = $('#flowId');
    data.nodeData = [];
    data.callBack = {
        onItemAddCallBack: function() {
            console.log(this);
        }
    }
    goolflow = new GooFlowMode().init(data);
    console.log(goolflow);
    
});