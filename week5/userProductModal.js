const {
  ref, onMounted
} = Vue;

export default {
  template: '#userProductModal',
  props: ['product'],
  setup(props) {
    const modalRef = ref(null);
    const modal = ref(null);
    const qty = ref(1);

    const openModal = () => {
      modal.value.show();
    };

    const hideModal = () => {
      modal.value.hide();
    };

    onMounted(() => {
      modal.value = new bootstrap.Modal(modalRef.value, {
        keyboard: false,
        backdrop: 'static',
      });
    });

    return {
      modalRef,
      qty,
      hideModal,
      openModal
    };
  },
};
