<template>
  <div id="appCreateView">
    <h2 style="margin-bottom: 32px">创建应用</h2>
    <a-form
      :model="form"
      :style="{ minWidth: '320px' }"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="appName" label="应用名称：">
        <a-input
          :style="{ width: '480px' }"
          v-model="form.appName"
          placeholder="请输入应用名称"
        />
      </a-form-item>
      <a-form-item field="appDesc" label="应用描述：">
        <a-textarea
          :style="{ width: '480px' }"
          v-model="form.appDesc"
          placeholder="请输入应用描述"
          :auto-size="{
            minRows: 1,
            maxRows: 20,
          }"
        />
      </a-form-item>
      <a-form-item field="appIcon" label="应用图标：">
        <a-input
          :style="{ width: '480px' }"
          v-model="form.appIcon"
          placeholder="请输入应用图标"
        />
      </a-form-item>
      <a-form-item field="appType" label="应用类型：">
        <a-select
          v-model="form.appType"
          :style="{ width: '320px' }"
          placeholder="请选择应用类型"
        >
          <a-option
            v-for="(value, key) of APP_TYPE_MAP"
            :key="Number(key)"
            :value="Number(key)"
            :label="value"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="scoringStrategy" label="评分策略：">
        <a-select
          v-model="form.scoringStrategy"
          :style="{ width: '320px' }"
          placeholder="请选择评分策略"
        >
          <a-option
            v-for="(value, key) of APP_SCORING_STRATEGY_MAP"
            :key="Number(key)"
            :value="Number(key)"
            :label="value"
          />
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watchEffect } from "vue";
import API from "@/api";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import { addApp, editApp, getAppVoById } from "@/api/appController";
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from "@/constant/app";

const form = ref({
  appDesc: "",
  appIcon: "",
  appName: "",
  appType: 0,
  scoringStrategy: 0,
} as API.AppAddRequest);

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => {
    return "";
  },
});

const router = useRouter();

/**
 * 提交
 */
const handleSubmit = async () => {
  if (form.value.appType === 0 && form.value.scoringStrategy === 1) {
    message.error("得分类应用暂不支持 AI 评分");
    return;
  }
  let res: any;
  // 如果是修改
  if (props.id) {
    res = await editApp({
      id: props.id as any,
      ...form.value,
    });
  } else {
    // 创建
    res = await addApp(form.value);
  }
  if (res.data.code === 0) {
    message.success("操作成功，即将跳转到应用详情页");
    setTimeout(() => {
      router.push(`/app/detail/${props.id || res.data.data}`);
    }, 3000);
  } else {
    message.error("操作失败，" + res.data.message);
  }
};

const oldApp = ref<API.AppVO>();

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.id) {
    return;
  }
  const res = await getAppVoById({
    id: props.id as any,
  });
  if (res.data.code === 0 && res.data.data) {
    oldApp.value = res.data.data;
    form.value = res.data.data;
  } else {
    message.error("获取数据失败，" + res.data.message);
  }
};

// 获取旧数据
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#appCreateView {
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 28px;
}
</style>
