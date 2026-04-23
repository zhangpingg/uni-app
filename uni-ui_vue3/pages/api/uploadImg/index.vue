<template>
    <view class="pl-20">
        <button size="mini" @click="fn1">选择图片/视频（相册/相机）</button>
        <button size="mini" @click="fn2">预览图片</button>
        <button size="mini" @click="fn31">保存图片到相册</button>
        <button size="mini" @click="fn32">保存视频到相册</button>
        <button size="mini" @click="fn4">上传图片到后台</button>

        <view>
            单纯的展示图片：
            <view v-for="(item, index) in imgList" :key="index" @click="fn2(index)">
                {{ item.tempFilePath }}
            </view>
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
        mediaType: ['image', 'video'], // 文件类型：轻按拍照、长按拍摄视频
        sourceType: ['album', 'camera'], // 相册，相机
        maxDuration: 8, // 拍摄视频最长拍摄时间
        camera: 'back', // 后置摄像头（默认）
        success(res) {
            if (res.type === 'video') {
                const videoFile = res.tempFiles[0];
                // 获取视频信息
                uni.getVideoInfo({ src: videoFile.tempFilePath }).then((infoRes) => {
                    if (infoRes.duration > 8) {
                        uni.showModal({
                            title: '提示',
                            content: `视频时长为 ${infoRes.duration}s，超过限制的8s`,
                            showCancel: false,
                            confirmText: '我知道了',
                        });
                        return;
                    }
                    // 压缩视频
                    uni.compressVideo({
                        src: res.tempFiles[0].tempFilePath, // 视频文件路径，可以是临时文件路径也可以是永久文件路径
                        quality: 'low', // 压缩质量
                    }).then((res2) => {
                        imgList.value = [...imgList.value, { ...res.tempFiles[0], tempFilePath: res2.tempFilePath }];
                    });
                });
            } else if (res.type === 'image') {
                imgList.value = [...imgList.value, ...res.tempFiles];
            }
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
const fn31 = () => {
    uni.saveImageToPhotosAlbum({
        filePath: imgList.value[0].tempFilePath,
        success: function () {
            console.log('保存到相册成功');
        },
        fail: (err) => {
            console.log('err', err);
        },
    });
};
// 保存视频到相册
const fn32 = () => {
    uni.saveVideoToPhotosAlbum({
        filePath: imgList.value[0].tempFilePath,
        success: function () {
            console.log('保存到相册成功');
        },
        fail: (err) => {
            console.log('err', err);
        },
    });
};
// 上传图片到后台
const fn4 = async () => {
    // 注意：真机调试时，1)token手动先添加进去 2)zc-ckj网络
    const uploadTask = uni.uploadFile({
        url: 'http://10.1.13.23/test/api/quality/common/file/upload',
        method: 'POST',
        'content-type': 'multipart/form-data',
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
