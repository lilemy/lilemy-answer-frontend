<template>
  <div id="aiGenerateQuestionDrawer">
    <!--  没token暂时关闭  -->
    <a-button type="outline" @click="handleClick" disabled>
      AI 生成题目
    </a-button>
    <a-drawer
      :width="340"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      unmountOnClose
    >
      <template #title>AI 生成题目</template>
      <div>
        <a-form
          :model="form"
          label-align="left"
          auto-label-width
          @submit="handleSubmit"
        >
          <a-form-item label="应用 id">
            {{ appId }}
          </a-form-item>
          <a-form-item field="questionNumber" label="题目数量">
            <a-input-number
              :min="0"
              :max="20"
              v-model="form.questionNumber"
              placeholder="请输入题目数量"
            />
          </a-form-item>
          <a-form-item field="optionNumber" label="选项数量">
            <a-input-number
              :min="2"
              :max="6"
              v-model="form.optionNumber"
              placeholder="请输入选项数量"
            />
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button
                :loading="submitting"
                html-type="submit"
                style="width: 120px"
              >
                {{ submitting ? "生成中" : "一键生成" }}
              </a-button>
              <a-button
                type="primary"
                style="width: 120px"
                @click="handleSSESubmit"
              >
                实时生成
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import { defineProps, reactive, ref, withDefaults } from "vue";
import API from "@/api";
import { aiGenerateQuestion } from "@/api/questionController";
import message from "@arco-design/web-vue/es/message";

interface Props {
  appId: string;
  onSuccess?: (result: API.QuestionContentRequest[]) => void;
  onSSESuccess?: (result: API.QuestionContentRequest) => void;
  onSSEStart?: (event: any) => void;
  onSSEClose?: (event: any) => void;
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return "";
  },
});

const form = reactive({
  optionNumber: 2,
  questionNumber: 10,
} as API.AIGenerateQuestionRequest);

const visible = ref(false);
const submitting = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};

/**
 * 提交
 */
const handleSubmit = async () => {
  if (!props.appId) {
    message.error("应用不存在");
    return;
  }
  submitting.value = true;
  const res = await aiGenerateQuestion({
    appId: props.appId as any,
    ...form,
  });
  submitting.value = false;
  if (res.data.code === 0 && res.data.data && res.data.data.length > 0) {
    if (props.onSuccess) {
      props.onSuccess(res.data.data);
    } else {
      message.success("生成题目成功");
    }
    // 关闭抽屉
    handleCancel();
  } else {
    message.error("操作失败，" + res.data.message);
  }
};

// 是否是开发环境
const isDev = process.env.NODE_ENV === "development";

const baseUrl = isDev
  ? "http://localhost:9126/api"
  : "https://answerapi.lilemy.cn/api";
/**
 * 实时生成
 */
const handleSSESubmit = async () => {
  if (!props.appId) {
    message.error("应用不存在");
    return;
  }
  // 创建 SSE 请求
  const eventSource = new EventSource(
    baseUrl +
      "/question/ai_generate/see" +
      `?appId=${props.appId}&optionNumber=${form.optionNumber}&questionNumber=${form.questionNumber}`
  );
  let first = true;
  // 接收消息
  eventSource.onmessage = function (event) {
    if (first) {
      props.onSSEStart?.(event);
      handleCancel();
      first = !first;
    }
    props.onSSESuccess?.(JSON.parse(event.data));
  };
  // 报错或连接关闭时触发
  eventSource.onerror = function (event) {
    if (event.eventPhase === EventSource.CLOSED) {
      props.onSSEClose?.(event);
      eventSource.close();
    } else {
      eventSource.close();
    }
  };
};
</script>

<style scoped></style>
