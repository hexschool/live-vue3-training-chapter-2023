<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

import UserProductModal from "@/components/UserProductModal.vue";

const userProductModalRef = ref(null);

const products = ref([]);
const loadingStatus = ref({
  loadingItem: "",
});
const isLoading = ref(false);
const product = ref({});

const addToCart = (id, qty = 1) => {
  isLoading.value = true;
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`;
  loadingStatus.value.loadingItem = id;
  const cart = {
    product_id: id,
    qty,
  };
  axios
    .post(url, { data: cart })
    .then((response) => {
      alert(response.data.message);
      loadingStatus.value.loadingItem = "";
      userProductModalRef.value.hideModal();
      isLoading.value = false;
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

const getProducts = () => {
  isLoading.value = true;
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products`;
  axios
    .get(url)
    .then((response) => {
      products.value = response.data.products;
      isLoading.value = false;
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

const getProduct = (id) => {
  isLoading.value = true;
  const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/product/${id}`;
  loadingStatus.value.loadingItem = id;
  axios
    .get(url)
    .then((response) => {
      loadingStatus.value.loadingItem = "";
      product.value = response.data.product;
      isLoading.value = false;
      userProductModalRef.value.openModal();
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div>
    <h1>This is 產品列表頁面</h1>
    <VueLoading :active="isLoading" />
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div style="
                height: 100px;
                background-size: cover;
                background-position: center;
              " :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
            <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
            <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button type="button" class="btn btn-outline-secondary" @click="getProduct(item.id)"
                :disabled="loadingStatus.loadingItem === item.id">
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                查看更多
              </button>
              <button type="button" class="btn btn-outline-danger" @click="addToCart(item.id)"
                :disabled="loadingStatus.loadingItem === item.id">
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <UserProductModal ref="userProductModalRef" :product="product" @add-to-cart="addToCart" />
  </div>
</template>

