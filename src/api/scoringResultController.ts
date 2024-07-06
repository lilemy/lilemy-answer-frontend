// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** 创建评分结果 POST /scoringResult/add */
export async function addScoringResult(
  body: API.ScoringResultAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/scoringResult/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除评分结果 POST /scoringResult/delete */
export async function deleteScoringResult(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/scoringResult/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑评分结果（给用户使用） POST /scoringResult/edit */
export async function editScoringResult(
  body: API.ScoringResultEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/scoringResult/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取评分结果（封装类） GET /scoringResult/get/vo */
export async function getScoringResultVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getScoringResultVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseScoringResultVO>('/scoringResult/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取评分结果列表（仅管理员可用） POST /scoringResult/list/page */
export async function listScoringResultByPage(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageScoringResult>('/scoringResult/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取评分结果列表（封装类） POST /scoringResult/list/page/vo */
export async function listScoringResultVoByPage(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageScoringResultVO>('/scoringResult/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前登录用户创建的评分结果列表 POST /scoringResult/my/list/page/vo */
export async function listMyScoringResultVoByPage(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageScoringResultVO>('/scoringResult/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新评分结果（仅管理员可用） POST /scoringResult/update */
export async function updateScoringResult(
  body: API.ScoringResultUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/scoringResult/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
