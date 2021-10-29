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
      :model-value="page"
      :max="pagination.totalPages"
      :max-pages="7"
      :direction-links="true"
      @update:model-value="changePage"
    />
  </div>
</template>

<script lang="ts">
import { Pagination } from '~/core/models/pagination.model';
import { Vue, prop, Options } from 'vue-class-component';

class Props {
  readonly pagination = prop<Pagination>({
    default: () => ({
      pageIndex: 0,
      pageSize: 12,
      totalCount: 0,
      totalPages: 0,
    }),
    required: true,
  });
}

@Options({
  watch: {
    pagination: {
      handler(value: Pagination) {
        (this as AppPaginator).page = value.pageIndex + 1;
        (this as AppPaginator).itemsPerPageValue = value.pageSize;
      },
      deep: true,
    },
  },
  emits: ['items-per-page-change', 'page-change'],
})
export default class AppPaginator extends Vue.with(Props) {
  itemsPerPageArray = [6, 12, 24, 48];
  page = this.pagination.pageIndex + 1;
  itemsPerPageValue = this.pagination.pageSize;

  updateItemsPerPage(value: number): void {
    this.itemsPerPageValue = value;
    this.$emit('items-per-page-change', value);
  }

  changePage(value: number): void {
    if (value != this.page) {
      this.$emit('page-change', value - 1);
    }
  }
}
</script>
