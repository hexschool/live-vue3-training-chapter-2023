<script setup>
import { useRouter } from "vue-router";
import axios from "axios";

import { ref, onMounted } from "vue";

const router = useRouter();

const checkSuccess = ref(false);

const checkLogin = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  if(token) {
    axios.defaults.headers.common.Authorization = token;
    const api = `${import.meta.env.VITE_API}api/user/check`;
    axios.post(api).then((response) => {
      if(response.data.success) {
        checkSuccess.value = true;
      } else {
        alert(response.data.message);
        router.push("/login");
      }
    });
  } else {
    alert("請先登入");
    router.push("/login");
  }

}

const signout = () => {
  document.cookie = `hexToken=;expires=`;
  alert("token 已清除");
  router.push("/login");
}

onMounted(() => {
  checkLogin();
});
</script>

<template>
  <div>
    <h1>你現在在後台頁面</h1>
    <div id="nav">
      <RouterLink to="/">回到前台</RouterLink> |
      <RouterLink to="/admin/products">後台產品列表</RouterLink> |
      <RouterLink to="/admin/orders">後台訂單</RouterLink> |
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <RouterView v-if="checkSuccess" />
  </div>
</template>

