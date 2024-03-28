import service from "../utils/request.js";

export const GetTireMenu = (data) => {
  return service.request({
    url: `/api/haotian/select/tire/left/menu`,
    method: "get",
    data,
  });
};

export const GetTireList = (data) => {
  return service.request({
    url: `/api/haotian/select/tire/list`,
    method: "post",
    data,
  });
};
