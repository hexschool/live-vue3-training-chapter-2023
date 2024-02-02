<script setup>
import { onMounted, ref } from 'vue';
import Modal from 'bootstrap/js/dist/modal';

const props = defineProps({
  product: {
    type: Object,
    default() {
      return {};
    },
  },
});

const emits = defineEmits(['add-to-cart']);

const modalRef = ref(null);

const modal = ref(null);
const qty = ref(1);

onMounted(() => {
  modal.value = new Modal(modalRef.value, {
    keyboard: false,
    backdrop: 'static'
  });
});

const openModal = () => {
  modal.value.show();
};

const hideModal = () => {
  modal.value.hide();
};

defineExpose({
  openModal,
  hideModal,
});
</script>


<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ props.product.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="props.product.imagesUrl" alt="" />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{
                props.product.category
              }}</span>
              <p>商品描述：{{ props.product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div class="h5" v-if="!product.price">
                {{ props.product.origin_price }} 元
              </div>
              <del class="h6" v-if="props.product.price"
                >原價 {{ props.product.origin_price }} 元</del
              >
              <div class="h5" v-if="props.product.price">
                現在只要 {{ props.product.price }} 元
              </div>
              <div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="qty"
                    min="1"
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="emits('add-to-cart', props.product.id, qty)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>