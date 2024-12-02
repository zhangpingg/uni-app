<template>
    <uni-file-picker
        mode="grid"
        :value="imgList"
        fileMediatype="image"
        :image-styles="imageStyles"
        @select="selectFile"
        @progress="progress"
        @success="success"
        @fail="fail"
    />
    <uni-file-picker
        :value="imgList"
        limit="1"
        disable-preview
        :image-styles="imageStyles"
        @select="selectFile"
        @progress="progress"
        @success="success"
        @fail="fail"
    >
        <text>选择头像</text>
    </uni-file-picker>
    <button size="mini" @click="fn1">上传图片到后台</button>
</template>

<script setup>
import { reactive, ref } from 'vue';

const imgList = ref([
    // {
    //     name: '01.png',
    //     extname: 'png',
    //     url: 'https://zc-oss.zcrubber.com/upload/files/2024/10/25/51153354783741344_my-bg.1729823213687.png',
    // },
    // {
    //     name: '02.png',
    //     extname: 'png',
    //     url: 'https://zc-oss.zcrubber.com/upload/files/2024/07/02/27224029997521838_2024年6月各科室销售达人榜.1719906422893.png',
    // },
]);
const imageStyles = reactive({
    height: 80, // 边框高度
    width: 80, // 边框宽度
    border: {
        // 如果为 Boolean 值，可以控制边框显示与否
        color: '#666', // 边框颜色
        width: '1px', // 边框宽度
        style: 'solid', // 边框样式
        radius: '5px', // 边框圆角，支持百分比
    },
});

// 选择文件
const selectFile = (e) => {
    console.log('选择文件：', e);
    imgList.value = [...imgList.value, ...e.tempFiles];
};
// 循环图片列表，调用上传接口
const fn1 = () => {
    console.log(11, imgList);
    imgList.value.map((item) => {
        fn2(item.url);
    });
};
// 上传图片到后台
const fn2 = async (filePath) => {
    // 注意：真机调试时，1)token手动先添加进去 2)zc-ckj网络
    const uploadTask = uni.uploadFile({
        url: 'http://10.1.13.23/test/api/quality/common/file/upload',
        header: {
            Authorization: uni.getStorageSync('token'),
        },
        filePath,
        name: 'uploadFile',
        formData: {
            extraData: '11', // 额外的数据
        },
        success: () => {
            console.log('上传成功');
        },
        fail: (err) => {
            console.log('err', err);
        },
    });
    // 监听上传进度
    uploadTask.onProgressUpdate((res) => {
        console.log('上传进度' + res.progress);
        console.log('已经上传的数据长度' + res.totalBytesSent);
        console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
        // 中断上传
        // if (res.progress > 50) {
        //     uploadTask.abort();
        // }
    });
};
</script>
