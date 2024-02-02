<script setup>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"

const props = defineProps(['pages']);

const emits = defineEmits(['emitPages']);

const updatePage = (page) => {
  emits('emitPages', page);
};
</script>


<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li :class="{ disabled: !props.pages.has_pre }" class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(props.pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in props.pages.total_pages"
        :key="page"
        :class="{ active: props.pages.current_page === page }"
      >
        <span class="page-link" v-if="page === props.pages.current_page">{{
          page
        }}</span>
        <a
          class="page-link"
          v-else
          href="#"
          @click.prevent="updatePage(page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item" :class="{ disabled: !props.pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(props.pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

