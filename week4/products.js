import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;

const app = createApp({
  setup() {
    const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
    const apiPath = 'hexschoolvue';
    
    const products = ref([]);
    const tempProduct = ref({ imagesUrl: [] });
    const pagination = ref({});
    const isNew = ref(false);

    const checkAdmin = () => {
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          getData();
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html';
        });
    };

    const getData = (page = 1) => {
      const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;

      axios.get(url)
        .then((response) => {
          products.value = response.data.products;
          pagination.value = response.data.pagination;
        }).catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    };

    const openModal = (type, item) => {
      if (type === 'new') {
        tempProduct.value = { imagesUrl: [] };
        isNew.value = true;
        productModal.show();
      } else if (type === 'edit') {
        tempProduct.value = { ...item };
        isNew.value = false;
        productModal.show();
      } else if (type === 'delete') {
        tempProduct.value = { ...item };
        delProductModal.show();
      }
    };

    onMounted(() => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common.Authorization = token;
      checkAdmin();
    });

    return {
      products,
      tempProduct,
      pagination,
      isNew,
      getData,
      openModal,
    };
  },
});

// 分頁元件
app.component('pagination', {
  template: '#pagination',
  props: ['pages'],
  setup(props, { emit }) {
    const emitPages = (item) => {
      emit('emit-pages', item);
    };

    return {
      emitPages,
    };
  }
});

// 產品新增/編輯元件
app.component('productModal', {
  template: '#productModal',
  props: ['isNew', 'product'],
  setup(props, { emit }) {
    const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
    const apiPath = 'hexschoolvue';

    const updateProduct = () => {
      let api = `${apiUrl}/api/${apiPath}/admin/product`;
      let httpMethod = 'post';

      if (!props.isNew) {
        api = `${apiUrl}/api/${apiPath}/admin/product/${props.product.id}`;
        httpMethod = 'put';
      }

      axios[httpMethod](api, { data: props.product })
        .then((response) => {
          alert(response.data.message);
          hideModal();
          emit('update');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const createImages = () => {
      props.product.imagesUrl = [];
      props.product.imagesUrl.push('');
    };

    const hideModal = () => {
      productModal.hide();
    };

    onMounted(() => {
      productModal = new bootstrap.Modal(document.getElementById('productModal'), {
        keyboard: false,
        backdrop: 'static',
      });
    });

    return {
      updateProduct,
      createImages,
    };
  },
});

// 產品刪除元件
app.component('delProductModal', {
  template: '#delProductModal',
  props: ['item'],
  setup(props, { emit }) {
    const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
    const apiPath = 'hexschoolvue';

    const delProduct = () => {
      axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${props.item.id}`)
        .then(() => {
          emit('update');
          hideModal();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const openModal = () => {
      delProductModal.show();
    };

    const hideModal = () => {
      delProductModal.hide();
    };

    onMounted(() => {
      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false,
        backdrop: 'static',
      });
    });

    return {
      delProduct,
      openModal,
    };
  },
});

app.mount('#app');
