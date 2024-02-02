<script setup>
import axios from "axios";

import { ref, onMounted } from "vue";

const products = ref([]);

onMounted(() => {
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products`;
  axios
    .get(url)
    .then((response) => {
      products.value = response.data.products;
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
});
</script>

<template>
  <div class="about">
    <h1>This is 單一產品頁面</h1>
    {{ product.title }}
  </div>
</template>

