<template>
  <q-layout view="lHh Lpr fff">
    <q-header elevated="elevated" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          class="q-mx-md"
          flat="flat"
          dense="dense"
          round="round"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="mdi-menu"
        ></q-btn>
        <q-btn
          class="q-ml-xs"
          flat="flat"
          no-caps="no-caps"
          no-wrap="no-wrap"
          v-if="$q.screen.gt.xs"
          link="link"
          to="/home"
        >
          <q-toolbar-title class="text-weight-bold" shrink="shrink">Project Manager</q-toolbar-title>
        </q-btn>
        <q-space> </q-space>
        <transition appear="appear" name="fade" mode="out-in">
          <q-btn
            class="q-ml-xs"
            v-if="!searchEnabled && !search"
            flat="flat"
            round="round"
            icon="mdi-magnify"
            @click="searchEnabled = true"
          >
          </q-btn>
          <q-input
            class="q-ml-md"
            v-else
            dark="dark"
            dense="dense"
            outlined="outlined"
            color="grey-1"
            autofocus="autofocus"
            v-model="search"
            input-class="text-right"
            @blur="searchEnabled = false"
          >
            <template v-slot:append>
              <q-icon v-if="search === ''" name="mdi-magnify"></q-icon>
              <q-icon class="cursor-pointer" v-else name="mdi-close" @click="search = ''"></q-icon>
            </template>
          </q-input>
        </transition>
        <q-btn class="q-ml-xs" flat="flat" round="round" icon="mdi-bell">
          <q-menu anchor="bottom middle" self="top middle">
            <app-user-notifications> </app-user-notifications>
          </q-menu>
        </q-btn>
        <q-btn class="q-ml-xs" flat="flat" round="round" icon="mdi-email">
          <q-menu anchor="bottom middle" self="top middle">
            <app-user-messages> </app-user-messages>
          </q-menu>
        </q-btn>
        <q-toggle v-model="darkMode" color="dark" icon="mdi-theme-light-dark"></q-toggle>
        <q-btn class="q-ml-xs" flat="flat" round="round">
          <q-avatar><img src="https://cdn.quasar.dev/img/boy-avatar.png" /></q-avatar>
          <q-menu anchor="bottom right" self="top middle">
            <app-user-badge></app-user-badge>
          </q-menu>
        </q-btn>
        <div class="text-subtitle2 q-ml-xs" v-if="$q.screen.gt.xs">Hi, {{ userFullName }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered="bordered" behavior="mobile" @click="leftDrawerOpen = false">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center"><span class="q-ml-sm">Project manager</span></q-toolbar-title>
        </q-toolbar>
        <q-list padding="padding">
          <q-item
            class="GPL__drawer-item"
            v-for="link in links1"
            :key="link.text"
            clickable="clickable"
            :to="link.path"
          >
            <q-item-section avatar="avatar">
              <q-icon :name="link.icon"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="GPL__page-container">
      <slot name="default"></slot>
      <q-page-sticky v-if="$q.screen.gt.sm" expand="expand" position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <router-link
            v-for="link in links1"
            :key="link.text"
            custom="custom"
            :to="link.path"
            v-slot="{ href, isActive, navigate }"
          >
            <q-btn
              class="GPL__side-btn"
              round="round"
              flat="flat"
              stack="stack"
              no-caps="no-caps"
              size="26px"
              :color="isActive ? 'primary' : ''"
              :href="href"
              @click="navigate"
            >
              <q-icon size="22px" :name="link.icon"></q-icon>
              <div class="GPL__side-btn__label">{{ link.text }}</div>
            </q-btn>
          </router-link>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { lazyInject } from '~/inversify.config';
import { AuthenticationStore, AUTHENTICATION_STORE } from '~/modules/authentication/core/store/authentication-store';

@Options({
  watch: {
    darkMode() {
      const _this = this as MainLayout;
      _this.$q.dark.set(_this.darkMode);
    },
  },
})
export default class MainLayout extends Vue {
  @lazyInject(AUTHENTICATION_STORE)
  private readonly _authenticationStore!: AuthenticationStore;

  leftDrawerOpen = false;
  searchEnabled = false;
  search = '';
  storage = 0.26;
  links1 = [
    { icon: 'mdi-home', text: 'Home', path: '/home' },
    { icon: 'mdi-folder-table', text: 'Projects', path: '/projects' },
  ];
  darkMode = false;

  mounted() {
    return (this.darkMode = this.$q.dark.isActive);
  }

  get userFullName() {
    if (!this._authenticationStore.user) return '';
    return `${this._authenticationStore.user.firstName} ${this._authenticationStore.user.lastName}`;
  }

  getActiveRouteColor(path: string) {
    return this.$route.path == path ? 'primary' : '';
  }
}
</script>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 35%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
    .q-item__label:not(.q-item__label--caption)
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
