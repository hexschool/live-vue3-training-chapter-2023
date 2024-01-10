import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

createApp({
  setup() {
    const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
    const apiPath = 'hexschoolvue';
    const products = ref([]);
    const status = ref(false);
    const tempProduct = ref({
      imagesUrl: [],
    });

    const checkAdmin = () => {
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    };

    const getData = () => {
      const url = `${apiUrl}/api/${apiPath}/admin/products/all`;
      axios.get(url)
        .then((response) => {
          products.value = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const updateProduct = () => {
      let url = `${apiUrl}/api/${apiPath}/admin/product`;
      let http = 'post';

      if (!status.value) {
        url = `${apiUrl}/api/${apiPath}/admin/product/${tempProduct.value.id}`;
        http = 'put';
      }

      axios[http](url, { data: tempProduct.value })
        .then((response) => {
          alert(response.data.message);
          productModal.hide();
          getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const openModal = (isNew, item) => {
      if (isNew === 'new') {
        tempProduct.value = {
          imagesUrl: [],
        };
        status.value = true;
        productModal.show();
      } else if (isNew === 'edit') {
        tempProduct.value = { ...item };
        status.value = false;
        productModal.show();
      } else if (isNew === 'delete') {
        tempProduct.value = { ...item };
        delProductModal.show();
      }
    };

    const delProduct = () => {
      const url = `${apiUrl}/api/${apiPath}/admin/product/${tempProduct.value.id}`;

      axios.delete(url)
        .then((response) => {
          alert(response.data.message);
          delProductModal.hide();
          getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const createImages = () => {
      tempProduct.value.imagesUrl = [];
      tempProduct.value.imagesUrl.push('');
    };

    onMounted(() => {
      productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false,
      });

      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false,
      });

      // Retrieve Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;

      checkAdmin();
    });

    return {
      products,
      status,
      tempProduct,
      updateProduct,
      openModal,
      delProduct,
      createImages,
    };
  },
}).mount('#app');
