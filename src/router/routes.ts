import { RouteRecordRaw } from "vue-router";
import ACCESS_ENUM from "@/access/accessEnum";
import HomeView from "@/views/HomeView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import AdminUserView from "@/views/admin/AdminUserView.vue";
import AdminAppView from "@/views/admin/AdminAppView.vue";
import AdminQuestionView from "@/views/admin/AdminQuestionView.vue";
import AdminScoringResultView from "@/views/admin/AdminScoringResultView.vue";
import AdminUserAnswerView from "@/views/admin/AdminUserAnswerView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AppDetailView from "@/views/app/AppDetailView.vue";
import AppCreateView from "@/views/app/AppCreateView.vue";
import QuestionCreateView from "@/views/question/QuestionCreateView.vue";
import ScoringResultCreateView from "@/views/scoringresult/ScoringResultCreateView.vue";
import DoAnswerView from "@/views/answer/DoAnswerView.vue";
import AnswerResultView from "@/views/answer/AnswerResultView.vue";
import MyAnswerView from "@/views/answer/MyAnswerView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },

  // region 用户页面路由
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  // endregion

  // region 应用页面路由
  {
    path: "/app/detail/:id",
    name: "应用详情",
    component: AppDetailView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/create/app",
    name: "创建应用",
    component: AppCreateView,
  },
  {
    path: "/create/app/:id",
    name: "修改应用",
    component: AppCreateView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  // endregion

  // region 题目页面路由
  {
    path: "/create/question/:appId",
    name: "题目创建",
    component: QuestionCreateView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/answer/result/:id",
    name: "答题结果",
    component: AnswerResultView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/answer/my",
    name: "我的答题",
    component: MyAnswerView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  // endregion

  // region 用户页面路由
  {
    path: "/create/scoring_result/:appId",
    name: "创建评分结果",
    component: ScoringResultCreateView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  // endregion

  // region 答题页面路由
  {
    path: "/answer/do/:appId",
    name: "答题页面",
    component: DoAnswerView,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER,
    },
  },
  // endregion

  // region 管理页面路由
  {
    path: "/admin",
    name: "管理页",
    component: AdminView,
  },
  {
    path: "/admin/user",
    name: "用户管理",
    component: AdminUserView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/app",
    name: "应用管理",
    component: AdminAppView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/question",
    name: "题目管理",
    component: AdminQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/scoring",
    name: "评分管理",
    component: AdminScoringResultView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/admin/answer",
    name: "回答管理",
    component: AdminUserAnswerView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  // endregion
];
