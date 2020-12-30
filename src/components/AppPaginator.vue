<template>
  <div class="full-width row items-center q-pa-sm">
    <div class="text-body2">Items per page</div>
    <q-btn-dropdown color="grey-7" round flat :label="itemsPerPageValue">
      <q-list>
        <q-item
          v-close-popup
          clickable
          v-for="(number, index) in itemsPerPageArray"
          :key="index"
          @click="updateItemsPerPage(number)"
        >
          <q-item-section>{{ number }}</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-space />
    <q-pagination
      :value="page"
      :max="pagination.totalPages"
      :max-pages="7"
      :direction-links="true"
      @input="changePage"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, ref, Ref, SetupContext, watch, PropType } from '@vue/composition-api';
import { Pagination } from 'src/core/types';

function useAppPaginator(pagination: Ref<Pagination>, context: SetupContext) {
  const itemsPerPageArray = [6, 12, 24, 48];
  const page = ref(pagination.value.pageIndex + 1);
  const itemsPerPageValue = ref(pagination.value.pageSize);

  function updateItemsPerPage(value: number): void {
    itemsPerPageValue.value = value;
    context.emit('items-per-page-change', value);
  }

  function changePage(value: number): void {
    if (value != page.value) {
      context.emit('page-change', value - 1);
    }
  }

  watch(pagination, (value: Pagination) => {
    page.value = value.pageIndex + 1;
    itemsPerPageValue.value = value.pageSize;
  });

  return {
    itemsPerPageArray,
    page,
    itemsPerPageValue,
    updateItemsPerPage,
    changePage
  };
}

export default defineComponent({
  name: 'AppPaginator',
  props: {
    pagination: {
      type: (Object as unknown) as PropType<Pagination>,
      default: () => ({
        pageIndex: 0,
        pageSize: 12,
        totalCount: 0,
        totalPages: 0
      }),
      require: true
    }
  },
  setup(props, context) {
    return {
      ...useAppPaginator(toRef(props, 'pagination'), context)
    };
  }
});
</script>
