import {
    Modal
} from "ant-design-vue";

//弹窗Modal框
export function confirm(confirm) {
    Modal.confirm({
        centered: true, //垂直居中展示
        okText: "确定",
        cancelText: "取消",
        icon: confirm.icon,
        title: confirm.title,
        content: confirm.content,
        onOk: confirm.onOk,
        onCancel: confirm.onCancel
    });
}
//验证器
export function validator(options) {
    return (rule, value, callback)=>{
        let reg = options.reg,
            isNull = options.isNull,
            formatErr = options.formatErr
        if (!value) {
            callback(new Error(isNull));
        } else if (!reg.test(value)) {
            callback(new Error(formatErr));
        } else {
            callback();
        }
    }
}