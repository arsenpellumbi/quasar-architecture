<template>
  <q-list class="rounded-borders" style="max-width: 350px">
    <q-item-label header="header">Notifications</q-item-label>
    <q-item clickable="clickable" v-ripple>
      <q-item-section avatar="avatar">
        <q-avatar>
          <q-icon name="mdi-bell-ring" color="primary"></q-icon>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label caption="caption" lines="2"
          ><span class="text-weight-bold text-primary">Info</span>-- Items are getting processed.</q-item-label
        >
      </q-item-section>
      <q-item-section side="side" top="top">1 min ago</q-item-section>
    </q-item>
    <q-separator inset="item"></q-separator>
    <q-item clickable="clickable" v-ripple>
      <q-item-section avatar="avatar">
        <q-avatar>
          <q-icon name="mdi-bell-ring" color="negative"></q-icon>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label caption="caption" lines="2"
          ><span class="text-weight-bold text-negative">Error</span>-- Items can not be downloaded before
          generated!</q-item-label
        >
      </q-item-section>
      <q-item-section side="side" top="top">1 min ago</q-item-section>
    </q-item>
    <q-separator inset="item"></q-separator>
    <q-item clickable="clickable" v-ripple>
      <q-item-section avatar="avatar">
        <q-avatar>
          <q-icon name="mdi-bell-ring" color="positive"></q-icon>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label caption="caption" lines="2"
          ><span class="text-weight-bold text-positive">Success</span>-- Package delivered successfully.</q-item-label
        >
      </q-item-section>
      <q-item-section side="side" top="top">1 min ago</q-item-section>
    </q-item>
    <q-separator inset="item"></q-separator>
    <q-item clickable="clickable" v-ripple>
      <q-item-section avatar="avatar">
        <q-avatar>
          <q-icon name="mdi-bell-ring" color="warning"></q-icon>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label caption="caption" lines="2"
          ><span class="text-weight-bold text-warning">Warning</span>-- Name is missing.</q-item-label
        >
      </q-item-section>
      <q-item-section side="side" top="top">1 min ago</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class AppUserNotifications extends Vue {}
</script>
