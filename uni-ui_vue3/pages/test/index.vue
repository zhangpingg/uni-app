<template>
    <view class="sct" @touchmove.stop.prevent>
        <!-- 遮罩层 -->
        <view v-if="isShowModal" class="sct-mask" @click="closeModal"></view>

        <!-- 步骤1: 选择车型 -->
        <view v-if="isShowModal && step === 1" class="sct-main">
            <view>点击选择车型</view>
            <view>
                <view
                    v-for="(url, index) in carTypeImgList"
                    :key="index"
                    class="sct-main-item tac"
                    :class="{ 'sct-main-itemActive': carType === carTypeList[index] }"
                    @click="selectCarType(carTypeList[index])"
                >
                    <image class="w-100" :src="url" mode="aspectFit" />
                    <text>{{ carTypeList[index] }}</text>
                </view>
            </view>
        </view>

        <!-- 步骤2: 选择轮位 -->
        <view v-if="isShowModal && step === 2" class="sct-main">
            <view class="select-tire__title">
                <view class="select-tire__title--click" @click="goBackPrevStep"> 返回：选择车型 </view>
            </view>
            <view class="select-tire__content">
                <view class="select-tire__bg">
                    <view class="select-tire__tip">请选择需要理赔轮胎的轮位</view>
                    <canvas canvas-id="myCanvas" id="myCanvas" class="canvas" @touchstart="onClickCanvas" />
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { pointData1, pointData2, pointData3, pointData4 } from './const';

// 车型图片列表
const carTypeImgList = [
    '/static/selectTire/8x4.png',
    '/static/selectTire/6x4.png',
    '/static/selectTire/4x2.png',
    '/static/selectTire/6x2.png',
];
const carTypeList = ['8×4', '6×4', '4×2', '6×2']; // 车型列表
// 选轮位时的背景所有车型图对象
const allTireAlphaBgData = {
    '8×4': 'https://zc-oss.zcrubber.com/upload/files/2026/04/24/84337024083815329_8x4tireAlpha.1777019415606.png',
    '6×4': 'https://zc-oss.zcrubber.com/upload/files/2026/04/24/96853410973581685_6x4tireAlpha.1777019434536.png',
    '4×2': 'https://zc-oss.zcrubber.com/upload/files/2026/04/24/84337057775858342_4x2tireAlpha.1777019449288.png',
    '6×2': 'https://zc-oss.zcrubber.com/upload/files/2026/04/24/96853436898839978_6x2tireAlpha.1777019460496.png',
};
// 所有轮胎点位对象
const allTirePositionData = {
    '8×4': pointData1,
    '6×4': pointData2,
    '4×2': pointData3,
    '6×2': pointData4,
};

// 高亮轮胎图片（正常的）
const imgTireNormal =
    'https://zc-oss.zcrubber.com/upload/files/2022/02/22/b2ecc30c-d901-4f40-9d25-874ef50dfb9ftireNormal.1645517862000.png';
// 高亮轮胎图片（备胎）
const imgTireBack =
    'https://zc-oss.zcrubber.com/upload/files/2022/02/22/7acc61a8-c3da-4c51-a577-75f25cad091atireBack.1645517859131.png';

// --- Props & Emits ---
const props = defineProps({
    carType: {
        type: String,
        default: '',
    },
    wheelPosition: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['handleSelectCar', 'handleSelectTire']);

const isShowModal = ref(true);
const step = ref(1); // 1-选择车型 2-选择轮位
const currentCarType = ref(''); // 当前车型
const cuttentTireAlphaBg = ref(''); // 当前背景图
const currentpTirePointData = ref([]); // 当前点位数据

let ctx = null; // Canvas 上下文

// 打开弹框
const openModal = () => {
    isShowModal.value = true;
    step.value = props.wheelPosition ? 2 : 1;

    if (props.wheelPosition) {
        // 如果有初始轮位，可能需要绘制，这里简化处理，通常是在选择车型后绘制
        // 如果需要回显，需根据 wheelPosition 找到对应的车型并调用 selectCarType
    }
};

// 关闭弹框
const closeModal = () => {
    // isShowModal.value = false;
};

// 获取适配尺寸
const getSize = (size) => {
    const systemInfo = uni.getSystemInfoSync();
    return size * (systemInfo.windowWidth / 375);
};

// 选择车型
const selectCarType = (carType) => {
    currentCarType.value = carType;
    cuttentTireAlphaBg.value = allTireAlphaBgData[carType];
    currentpTirePointData.value = allTirePositionData[carType];
    step.value = 2;
    ctx = uni.createCanvasContext('myCanvas'); // 初始化 Canvas 上下文
    ctx.clearRect(0, 0, getSize(303), getSize(366)); // 清除画布
    drawBgImg(cuttentTireAlphaBg.value, 0, 0, 303, 366); // 绘制背景
};

// 绘制背景图片
const drawBgImg = (imgUrl, x, y, w, h, cb) => {
    //  const fs = uni.getFileSystemManager(); // 获取文件系统管理器
    //  // 读取文件
    //  fs.readFile({
    //      filePath: imgUrl,
    //      encoding: 'base64',
    //      success: (res) => {
    // console.log(11 ,res);
    //          const base64Url = 'data:image/png;base64,' + res.data; // res.data 是 base64 字符串
    //          if (ctx) {
    // 	console.log(12, ctx);
    //              ctx.drawImage(base64Url, getSize(x), getSize(y), getSize(w), getSize(h));
    // 	console.log(13);
    //              ctx.draw(false, () => {
    // 		console.log(14);
    //                  cb && cb({ path: base64Url }); // 注意：这里没有真正的 file path，但你可以传递 base64
    //              }, (err) => {
    // 		console.log(15, err);
    // 	});
    //          }
    //      },
    //      fail: (err) => {
    //          console.error('文件读取失败', err);
    //      },
    //  });

    uni.getImageInfo({
        src: imgUrl,
        success: (res) => {
            console.log(21);
            ctx.drawImage(res.path, getSize(x), getSize(y), getSize(w), getSize(h));
            console.log(22);
            ctx.draw();
            console.log(23);
            cb && cb(res);
        },
        fail: (err) => {
            console.error('getImageInfo 失败', err);
        },
    });
};

// 返回上一步
const goBackPrevStep = () => {
    step.value = 1;
};

// 点击 Canvas 选择轮胎
const onClickCanvas = (e) => {
    // e.touches[0] 在 uni-app 中通常也是可用的
    const touch = e.touches[0];
    if (!touch) return;

    const { clientX: x, clientY: y } = touch;

    // 获取 Canvas 节点位置
    const query = uni.createSelectorQuery();
    query
        .select('.canvas')
        .boundingClientRect((rect) => {
            if (!rect) return;

            // 计算相对于 Canvas 内部的坐标
            const clearX = x - rect.left;
            const clearY = y - rect.top;

            const w = 17; // 轮胎宽
            const h = 58; // 轮胎高
            const b = 63; // 备胎宽高

            const points = currentpTirePointData.value;

            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                // 增加一点点击容错范围 (+/- 10)
                if (p && clearX > p.xLeft - 10 && clearX < p.xRight + 10 && clearY > p.yTop && clearY < p.yBottom) {
                    let tire = imgTireNormal;
                    let tireWidth = w;
                    let tireHeight = h;

                    // 假设最后一个是备胎
                    if (i === points.length - 1) {
                        tire = imgTireBack;
                        tireWidth = b;
                        tireHeight = b;
                    }

                    uni.showLoading({
                        title: '绘制中...',
                        mask: true,
                    });

                    // 重绘背景
                    if (ctx) {
                        ctx.clearRect(0, 0, getSize(303), getSize(366));
                        ctx.drawImage(cuttentTireAlphaBg.value, 0, 0, getSize(303), getSize(366));
                    }

                    // 绘制选中的轮胎
                    drawBgImg(tire, p.xLeft, p.yTop, tireWidth, tireHeight, () => {
                        setTimeout(() => {
                            uploadImg();
                        }, 500);
                    });

                    break; // 找到即停止
                }
            }
        })
        .exec();
};

// 生成图片并上传
const uploadImg = () => {
    uni.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: getSize(303),
        height: getSize(366),
        destWidth: getSize(303),
        destHeight: getSize(366),
        canvasId: 'myCanvas', // 对应 canvas-id
        success: (res) => {
            // 这里替换为你实际的上传逻辑
            // 原代码使用了 store.dispatch(dispatchUploadFile...)
            // 示例使用 uni.uploadFile
            uni.showLoading({ title: '上传中...' });

            uni.uploadFile({
                url: 'http://10.1.13.23/test/api/quality/common/file/upload', // 替换为你的上传接口
                filePath: res.tempFilePath,
                name: 'file',
                header: {
                    Authorization: uni.getStorageSync('token'),
                },
                success: (uploadRes) => {
                    uni.hideLoading();
                    const data = JSON.parse(uploadRes.data);
                    // 假设返回结构包含 url
                    const imageUrl = data.data || data.url;

                    closeModal();
                    emit('handleSelectCar', currentCarType.value);
                    emit('handleSelectTire', imageUrl);
                },
                fail: (err) => {
                    uni.hideLoading();
                    handleUploadFail();
                },
            });
        },
        fail: (err) => {
            console.error('canvasToTempFilePath fail', err);
            handleUploadFail();
        },
    });
};

const handleUploadFail = () => {
    uni.showToast({
        title: '上传失败，请重试！',
        icon: 'none',
    });
};

// 暴露方法给父组件调用，例如父组件点击按钮打开此弹窗
defineExpose({
    openModal,
});
</script>

<style lang="scss" scoped>
.sct {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    .sct-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        pointer-events: auto;
        border: 1px solid #f00;
        box-sizing: border-box;
    }
    .sct-main {
        position: fixed;
        top: 100rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 600rpx;
        background: #fff;
        border-radius: 20rpx;
        z-index: 11;
        .sct-main-item {
            width: 50%;
            display: inline-block;
        }
        .sct-main-itemActive {
            border: 1px solid #f00;
        }
    }

    .canvas {
        width: 303px; /* 注意单位转换，原代码是 px 逻辑 */
        height: 366px;
        margin: 0 auto;
        display: block;
    }
}
</style>

