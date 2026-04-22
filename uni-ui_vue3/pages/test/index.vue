<template>
    <view>
       <button type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
               获取手机号动态令牌
           </button>
    </view>
</template>

<script setup>

const getPhoneNumber = (e) => {
    console.log(11, e);
};

</script>

<style lang="scss" scoped></style>
