// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** 创建用户答案 POST /userAnswer/add */
export async function addUserAnswer(
  body: API.UserAnswerAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/userAnswer/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户答案 POST /userAnswer/delete */
export async function deleteUserAnswer(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/userAnswer/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取用户答案（封装类） GET /userAnswer/get/vo */
export async function getUserAnswerVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserAnswerVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserAnswerVO>('/userAnswer/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取用户答案列表（仅管理员可用） POST /userAnswer/list/page */
export async function listUserAnswerByPage(
  body: API.UserAnswerQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserAnswer>('/userAnswer/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取用户答案列表（封装类） POST /userAnswer/list/page/vo */
export async function listUserAnswerVoByPage(
  body: API.UserAnswerQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserAnswerVO>('/userAnswer/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前登录用户创建的用户答案列表 POST /userAnswer/my/list/page/vo */
export async function listMyUserAnswerVoByPage(
  body: API.UserAnswerQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserAnswerVO>('/userAnswer/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
