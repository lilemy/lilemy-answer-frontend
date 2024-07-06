<template>
  <div id="questionCreateView">
    <h2>创建题目</h2>
    <a-form
      :model="questionContent"
      :style="{ width: '600px' }"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item label="应用名称">
        {{ appData?.appName }}
      </a-form-item>
      <a-form-item label="应用类型">
        {{ APP_TYPE_MAP[Number(appData?.appType)] }}
      </a-form-item>
      <a-form-item label="题目列表" :content-flex="false" :merge-props="false">
        <a-space size="medium" style="margin-bottom: 30px">
          <a-button
            size="medium"
            @click="addQuestionTopic(questionContent.length)"
          >
            底部添加题目
          </a-button>
          <!-- AI 生成题目抽屉 -->
          <AiGenerateQuestionDrawer
            :appId="appId"
            :onSuccess="onAiGenerateSuccess"
            :onSSESuccess="onAiGenerateSuccessSSE"
            :onSSEClose="onSSEClose"
            :onSSEStart="onSSEStart"
          />
        </a-space>
        <!--遍历题目-->
        <div
          v-for="(question, index) of questionContent"
          :key="index"
          style="margin-bottom: 80px"
        >
          <a-divider :size="2" style="border-color: black">
            <h3>题目：{{ index + 1 }}</h3>
          </a-divider>
          <a-space size="large">
            <h3>题目：{{ index + 1 }}</h3>
            <a-button
              type="primary"
              size="medium"
              @click="addQuestionTopic(index + 1)"
            >
              添加题目
            </a-button>
            <a-button
              size="medium"
              status="danger"
              @click="deleteQuestionTopic(index)"
            >
              删除题目
            </a-button>
          </a-space>
          <a-form-item :label="`题目 ${index + 1} 标题`">
            <a-input v-model="question.title" placeholder="请输入题目标题" />
          </a-form-item>
          <!--  题目选项 -->
          <a-space size="large">
            <h4>题目 {{ index + 1 }} 选项列表</h4>
            <a-button
              size="small"
              @click="
                addQuestionOption(question, Number(question.options?.length))
              "
            >
              底部添加选项
            </a-button>
          </a-space>
          <!--遍历选项列表-->
          <a-form-item
            v-for="(option, optionIndex) of question.options"
            :label="`选项 ${optionIndex + 1}`"
            :content-flex="false"
            :key="optionIndex"
            :merge-props="false"
          >
            <a-form-item label="选项">
              <a-input v-model="option.key" placeholder="请输入选项" />
            </a-form-item>
            <a-form-item label="选项值">
              <a-input v-model="option.value" placeholder="请输入选项值" />
            </a-form-item>
            <a-form-item v-if="appData?.appType === 1" label="选项结果">
              <a-input v-model="option.result" placeholder="请输入选项结果" />
            </a-form-item>
            <a-form-item v-if="appData?.appType === 0" label="选项得分">
              <a-input-number
                v-model="option.score"
                placeholder="请输入选项得分"
              />
            </a-form-item>
            <a-space size="large">
              <a-button
                size="mini"
                type="primary"
                @click="addQuestionOption(question, optionIndex + 1)"
              >
                添加选项
              </a-button>
              <a-button
                size="mini"
                status="danger"
                @click="deleteQuestionOption(question, optionIndex as any)"
              >
                删除选项
              </a-button>
            </a-space>
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="width: 120px"
          size="large"
        >
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
// 题目内容结构（理解为题目列表）
import { ref, withDefaults, defineProps, watchEffect } from "vue";
import API from "@/api";
import message from "@arco-design/web-vue/es/message";
import {
  addQuestion,
  editQuestion,
  listQuestionVoByPage,
} from "@/api/questionController";
import { useRouter } from "vue-router";
import { getAppVoById } from "@/api/appController";
import AiGenerateQuestionDrawer from "@/views/question/ccomponents/AIGenerateQuestionDrawer.vue";
import { APP_TYPE_MAP } from "../../constant/app";

interface Props {
  appId: string;
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return "";
  },
});

const questionContent = ref<API.QuestionContentRequest[]>([]);
const appData = ref<API.AppVO>();

const router = useRouter();

const oldQuestion = ref<API.QuestionVO>();

/**
 * 添加题目
 * @param index
 */
const addQuestionTopic = (index: number) => {
  questionContent.value.splice(index, 0, {
    title: "",
    options: [],
  });
};

/**
 * 删除题目
 * @param index
 */
const deleteQuestionTopic = (index: number) => {
  questionContent.value.splice(index, 1);
};

/**
 * 添加题目选项
 * @param question
 * @param index
 */
const addQuestionOption = (
  question: API.QuestionContentRequest,
  index: number
) => {
  if (!question.options) {
    question.options = [];
  }
  question.options.splice(index, 0, {
    key: "",
    value: "",
  });
};

/**
 * 删除题目选项
 * @param question
 * @param index
 */
const deleteQuestionOption = (
  question: API.QuestionContentRequest,
  index: number
) => {
  if (!question.options) {
    question.options = [];
  }
  question.options.splice(index, 1);
};

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.appId) {
    return;
  }
  const app = await getAppVoById({
    id: props.appId as any,
  });
  if (app.data.code === 0 && app.data.data) {
    appData.value = app.data.data;
  } else {
    message.error("获取数据失败，" + app.data.message);
  }
  const res = await listQuestionVoByPage({
    appId: props.appId as any,
    current: 1,
    pageSize: 1,
    sortField: "createTime",
    sortOrder: "descend",
  });
  if (res.data.code === 0 && res.data.data?.records) {
    oldQuestion.value = res.data.data?.records[0];
    if (oldQuestion.value) {
      questionContent.value = oldQuestion.value.questionContent ?? [];
    }
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

// 获取旧数据
watchEffect(() => {
  loadData();
});

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!props.appId || !questionContent.value) {
    return;
  }
  let res: any;
  // 如果是修改
  if (oldQuestion.value?.id) {
    res = await editQuestion({
      id: oldQuestion.value.id,
      questionContent: questionContent.value,
    });
  } else {
    // 创建
    res = await addQuestion({
      appId: props.appId as any,
      questionContent: questionContent.value,
    });
  }
  if (res.data.code === 0) {
    message.success("操作成功，即将跳转到应用详情页");
    setTimeout(() => {
      router.push(`/app/detail/${props.appId}`);
    }, 3000);
  } else {
    message.error("操作失败，" + res.data.message);
  }
};
/**
 * AI 生成题目成功后执行
 */
const onAiGenerateSuccess = (result: API.QuestionContentRequest[]) => {
  message.success(`AI 生成题目成功，生成 ${result.length} 道题目`);
  questionContent.value = [...questionContent.value, ...result];
};
/**
 * AI 生成题目成功后执行（SSE）
 */
const onAiGenerateSuccessSSE = (result: API.QuestionContentRequest) => {
  questionContent.value = [...questionContent.value, result];
};

/**
 * SSE 开始生成
 * @param event
 */
const onSSEStart = (event: any) => {
  message.success("开始生成");
};

/**
 * SSE 生成完毕
 * @param event
 */
const onSSEClose = (event: any) => {
  message.success("生成完毕");
};
</script>

<style scoped>
#questionCreateView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}
</style>
