<template>
    <view class="pl-20">
        <button size="mini" @click="fn1">选择视频（相册/相机）</button>
        <button size="mini" @click="fn2">预览图片</button>
        <button size="mini" @click="fn3">保存图片到相册</button>
        <button size="mini" @click="fn4">上传图片到后台</button>

        <view>
            单纯的展示图片：
            <image v-for="(item, index) in imgList" :src="item.tempFilePath" :key="index" @click="fn2(index)" />
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';

const imgList = ref([]);

// 选择图片（相册/相机）
const fn1 = () => {
    uni.chooseMedia({
        count: 9,
        mediaType: ['image', 'video'], // 文件类型
        sourceType: ['album', 'camera'], // 相册，相机
        maxDuration: 30, // 拍摄视频最长拍摄时间
        camera: 'back', // 后置摄像头（默认）
        success(res) {
            imgList.value = [...imgList.value, ...res.tempFiles];
        },
    });
};
// 预览图片
const fn2 = (index) => {
    let urls = imgList.value.map((item) => item.tempFilePath);
    uni.previewImage({
        current: index || 0,
        urls,
        showmenu: true,
        indicator: 'number',
        loop: true,
    });
};
// 保存图片到相册
const fn3 = () => {
    uni.saveImageToPhotosAlbum({
        filePath: imgList.value[0].tempFilePath,
        success: function () {
            console.log('保存到相册成功');
        },
    });
};
// 上传图片到后台
const fn4 = async () => {
    // 注意：真机调试时，1)token手动先添加进去 2)zc-ckj网络
    const uploadTask = uni.uploadFile({
        url: 'http://10.1.13.23/test/api/quality/common/file/upload',
        header: {
            Authorization: uni.getStorageSync('token'),
        },
        filePath: imgList.value[0].tempFilePath,
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

<style lang="scss" scoped></style>
