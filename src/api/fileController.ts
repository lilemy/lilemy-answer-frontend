// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** 文件上传 POST /file/upload */
export async function uploadFile(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString>('/file/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
      uploadFileRequest: undefined,
      ...params['uploadFileRequest'],
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户头像上传 POST /file/upload/user */
export async function uploadFileUser(body: {}, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/file/upload/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
