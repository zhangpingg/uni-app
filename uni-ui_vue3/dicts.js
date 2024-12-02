// 字典集合

/**
 * @description 默认获取label值
 * @param {Array} options 字典数组
 * @param {Number} value value值，（如果是多个用','隔开，如:value:'1,2'）
 * @param {String} label 取某个key的值，默认label
 * @returns {String} 返回value对应的文本汉字值
 */
export const getLabelByValue = (options, value, label = 'label') => {
    if ([null, undefined, ''].includes(value)) {
        return '-';
    }
    let _list = options.filter((item) => String(value).split(',').includes(String(item.value)));
    let _label = _list.map((item) => item[label]).join('、');
    return _label;
};

/**
 * @description 获取字典项的索引
 * @param {Array} options 字典数组
 * @param {Number} value
 * @returns {number} 返回value对应的字典的索引
 */
export const getIndexByValue = (options, value) => {
	let _index = 0;
	options.map((item, index) => {
		if(item.value == value){
			_index = index;
		}
	})
	return _index;
}

/**
 * @description 截取部分字典
 * @param {Array} options 字典数组
 * @param {Array} values [1, 2] 要截取的value值数组
 * @param {Boolean} isSort 是否按照values排序
 */
export const sliceDictByValues = (options, values, isSort = false) => {
    if (isSort) {
        const arr = [];
        values.map((item) => {
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === item) {
                    arr.push(options[i]);
                }
            }
        });
        return arr;
    }
    return options.filter((item) => values.includes(item.value));
};

// 【物流状态】
export const logisticsStatusDict = [
    { value: 0, label: '未查询' },
    { value: 1, label: '运输中' },
    { value: 2, label: '已签收' },
    { value: 3, label: '无效订单' },
];
