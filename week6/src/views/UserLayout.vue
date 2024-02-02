<template>
  <div class="home">
    <h1>你現在在前台頁面</h1>
    <div id="nav">
      <RouterLink to="/">首頁</RouterLink> |
      <RouterLink to="/products">前台產品列表</RouterLink> |
      <RouterLink to="/cart">前台購物車</RouterLink> |
      <RouterLink to="/admin/products">後台購物車列表</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>