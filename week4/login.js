import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup() {
    const user = ref({
      username: '',
      password: '',
    });

    const login = () => {
      const api = 'https://vue3-course-api.hexschool.io/admin/signin';
      axios.post(api, user.value)
        .then((response) => {
          const { token, expired } = response.data;
          // Write cookie token
          // Set expiration time
          document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
          window.location = 'products.html';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    return {
      user,
      login,
    };
  },
}).mount('#app');
