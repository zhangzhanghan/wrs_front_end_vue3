import request from "@/utils/request";

// 登录方法
export function add(edgeArray, uniqueNodeArrayInput, nodeSelfInfoInput) {
  const data = {
    flowInfo: edgeArray,
    nodeInfo: uniqueNodeArrayInput,
    nodeSelfInfo: nodeSelfInfoInput,
  };
  return request({
    url: "/add",
    headers: {
      isToken: false,
      repeatSubmit: true,
    },
    method: "post",
    data: data,
  });
}
// export function add(width) {
//   const data = {
//     name: "张三",
//     password: "123456",
//   };
//   return request({
//     url: "/add",
//     headers: {
//       isToken: false,
//       repeatSubmit: true,
//     },
//     method: "post",
//     data: data,
//   });
// }
export function del() {
  const data = {
    name: "张三",
    password: "123456",
  };
  return request({
    url: "/del",
    headers: {
      isToken: false,
      repeatSubmit: true,
    },
    method: "post",
    data: data,
  });
}
export function update(name, password) {
  const data = {
    name: name,
    password: password,
  };
  return request({
    url: "/update",
    headers: {
      isToken: false,
      repeatSubmit: true,
    },
    method: "post",
    data: data,
  });
}

// export function update() {
//   const data = {
//     name: "张三",
//     password: "1234567",
//   };
//   return request({
//     url: "/update",
//     headers: {
//       isToken: false,
//       repeatSubmit: true,
//     },
//     method: "post",
//     data: data,
//   });
// }
export function searchFlowService() {
  const data = {};
  return request({
    url: "/searchFlowService",
    headers: {
      isToken: false,
      repeatSubmit: true,
    },
    method: "post",
    data: data,
  });
}

export function SearchFlowByRelaId(relaId) {
  const data = {
    relaId: relaId,
  };
  return request({
    url: "/SearchFlowByRelaId",
    headers: {
      isToken: false,
      repeatSubmit: true,
    },
    method: "post",
    data: data,
  });
}

// export function search() {
//   const data = {
//     name: "张三",
//     password: "123456",
//   };
//   return request({
//     url: "/search",
//     headers: {
//       isToken: false,
//       repeatSubmit: true,
//     },
//     method: "post",
//     data: data,
//   });
// }
