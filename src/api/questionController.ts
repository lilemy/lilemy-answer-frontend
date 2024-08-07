// @ts-ignore
/* eslint-disable */
import request from '@/request';

/** 创建题目 POST /question/add */
export async function addQuestion(body: API.QuestionAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/question/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** ai 生成应用题目 POST /question/ai_generate */
export async function aiGenerateQuestion(
  body: API.AIGenerateQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListQuestionContentRequest>('/question/ai_generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** ai 生成应用题目（实时） GET /question/ai_generate/see */
export async function aiGenerateQuestionSse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.aiGenerateQuestionSSEParams,
  options?: { [key: string]: any },
) {
  return request<API.SseEmitter>('/question/ai_generate/see', {
    method: 'GET',
    params: {
      ...params,
      aiGenerateQuestionRequest: undefined,
      ...params['aiGenerateQuestionRequest'],
    },
    ...(options || {}),
  });
}

/** 删除题目 POST /question/delete */
export async function deleteQuestion(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/question/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑题目（用户使用） POST /question/edit */
export async function editQuestion(
  body: API.QuestionEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/question/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取题目（封装类） GET /question/get/vo */
export async function getQuestionVoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionVOByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseQuestionVO>('/question/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取题目列表（仅管理员可用） POST /question/list/page */
export async function listQuestionByPage(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestion>('/question/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取题目列表（封装类） POST /question/list/page/vo */
export async function listQuestionVoByPage(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionVO>('/question/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取当前登录用户创建的题目列表 POST /question/my/list/page/vo */
export async function listMyQuestionVoByPage(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionVO>('/question/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新题目（仅管理员可用） POST /question/update */
export async function updateQuestion(
  body: API.QuestionUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/question/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
