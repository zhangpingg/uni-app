worker.onMessage(function (res) {
	console.log(res); // 数据: 主线程=>worker线程
	worker.postMessage('数据: worker线程=>主线程');
});
