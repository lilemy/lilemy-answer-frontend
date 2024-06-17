import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import AdminUserView from "@/views/admin/AdminUserView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import AdminAppView from "@/views/admin/AdminAppView.vue";
import AdminQuestionView from "@/views/admin/AdminQuestionView.vue";
import AdminScoringResultView from "@/views/admin/AdminScoringResultView.vue";
import AdminUserAnswerView from "@/views/admin/AdminUserAnswerView.vue";
import AdminView from "@/views/admin/AdminView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: HomeView,
  },
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
];
