import {
	domainEnv
} from "../config/domainEnv.js";

const showToast = (msg) => {
	uni.showToast({
		icon: "none",
		title: msg,
	});
};

// 错误码
const codeMessage = {
	200: "服务器成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "请求错误。",
	401: "用户没有权限（用户名或密码错误）。",
	403: "拒绝访问。",
	404: "请求地址出错。",
	406: "请求的格式不可得。",
	408: "请求超时。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器内部错误。",
	502: "网关错误。",
	503: "服务不可用。",
	504: "网关超时。",
	505: "HTTP版本不受支持。",
};

const service = {
	request: (params) => {
		// 默认需要loading
		let isLoading = params.isLoading || true;
		// 如果需要loading
		if (isLoading) {
			uni.showLoading({
				title: params.loadingText || "加载中...",
				mask: true,
			});
		}
		// uni.request 请求头中 content-type默认application/json
		// application/json 会进行 JSON 序列化 body传参
		// application/x-www-form-urlencoded 会将数据转换为 query string
		let header = Object.assign({}, {
				"content-type": "application/json",
			},
			params.header, // 传入的请求头 Authorization、content-type等
		);
		return new Promise((resolve, reject) => {
			uni.request({
				url: domainEnv[domainEnv.env].api + params.url,
				data: params.data,
				method: params.method,
				header: params.header,
				success: (res) => {
					const {
						data,
						statusCode: status
					} = res;
					if (status !== 200) {
						showToast(
							codeMessage[status] ||
							data.message ||
							"当前访问人数过多，请稍后再试",
						);
						reject(
							codeMessage[status] ||
							data.message ||
							"当前访问人数过多，请稍后再试",
						);
					}

					if (data.code !== 200) {
						if (
							typeof data === "string" &&
							data.indexOf("Blocked by Sentinel") > -1
						) {
							reject("Blocked by Sentinel");
						}
						showToast(data.message);
						reject(data);
					}
					resolve(data);
				},
				fail: (err) => {
					console.warn(JSON.stringify(err));
					let errMsg = err.message;
					if (err && err.response) {
						errMsg = codeMessage[err.response.status];
					}
					showToast(errMsg);
					reject(errMsg || new Error("当前访问人数过多，请稍后再试"));
				},
				complete: () => {
					isLoading && uni.hideLoading();
				},
			});
		});
	},
};

export default service;