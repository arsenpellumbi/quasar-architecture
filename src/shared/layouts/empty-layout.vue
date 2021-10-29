<template>
  <q-layout>
    <q-page-container>
      <slot name="default"></slot>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class EmptyLayout extends Vue {}
</script>
