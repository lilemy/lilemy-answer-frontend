// @ts-ignore
/* eslint-disable */
import request from "@/request";

/** 热门应用排行 GET /statistic/answer/count */
export async function getAppAnswerCount(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAppAnswerCountVO>(
    "/statistic/answer/count",
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** 应用回答分布 GET /statistic/answer/result/count */
export async function getAppAnswerResultCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAppAnswerResultCountParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseAppAnswerResultCountVO>(
    "/statistic/answer/result/count",
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
