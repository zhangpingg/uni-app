const w = 17,
    h = 58,
    b = 63;

// 上方4轮 T1 T2
const T1 = [
    // 左1
    {
        xLeft: 106,
        xRight: 106 + w,
        yTop: 34,
        yBottom: 34 + h,
    },
    // 右1
    {
        xLeft: 180,
        xRight: 180 + w,
        yTop: 34,
        yBottom: 34 + h,
    },
];
const T2 = [
    // 左2
    {
        xLeft: 106,
        xRight: 106 + w,
        yTop: 97,
        yBottom: 97 + h,
    },
    // 右2
    {
        xLeft: 180,
        xRight: 180 + w,
        yTop: 97,
        yBottom: 97 + h,
    },
];

// 下方8轮 B1 B2
const B1 = [
    // 左1
    {
        xLeft: 46,
        xRight: 46 + w,
        yTop: 166,
        yBottom: 166 + h,
    },
    // 左2
    {
        xLeft: 111,
        xRight: 111 + w,
        yTop: 166,
        yBottom: 166 + h,
    },
    // 右1
    {
        xLeft: 176,
        xRight: 176 + w,
        yTop: 166,
        yBottom: 166 + h,
    },
    // 右2
    {
        xLeft: 241,
        xRight: 241 + w,
        yTop: 166,
        yBottom: 166 + h,
    },
];
const B2 = [
    // 左3
    {
        xLeft: 46,
        xRight: 46 + w,
        yTop: 242,
        yBottom: 242 + h,
    },
    // 左4
    {
        xLeft: 111,
        xRight: 111 + w,
        yTop: 242,
        yBottom: 242 + h,
    },
    // 右3
    {
        xLeft: 176,
        xRight: 176 + w,
        yTop: 242,
        yBottom: 242 + h,
    },
    // 右4
    {
        xLeft: 241,
        xRight: 241 + w,
        yTop: 242,
        yBottom: 242 + h,
    },
];

// 下方4轮 B3
const B3 = [
    // 左1
    {
        xLeft: 46,
        xRight: 46 + w,
        yTop: 210,
        yBottom: 210 + h,
    },
    // 左2
    {
        xLeft: 111,
        xRight: 111 + w,
        yTop: 210,
        yBottom: 210 + h,
    },
    // 右1
    {
        xLeft: 176,
        xRight: 176 + w,
        yTop: 210,
        yBottom: 210 + h,
    },
    // 右2
    {
        xLeft: 241,
        xRight: 241 + w,
        yTop: 210,
        yBottom: 210 + h,
    },
];
// 备胎
const K = {
    xLeft: 121,
    xRight: 121 + b,
    yTop: 290,
    yBottom: 290 + b,
};

// 8×4
export const pointData1 = [...T1, ...T2, ...B1, ...B2, K];

// 6×4
export const pointData2 = [...T1, ...B1, ...B2, K];

// 4×2
export const pointData3 = [
    ...T1, // 上方2轮：左1，右1
    ...B3, // 下方4轮：左1，左2，右1，右2
    K, // 备胎
];

// 6×2
export const pointData4 = [...T1, ...T2, ...B3, K];
