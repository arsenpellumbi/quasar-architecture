<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="mdi-menu"
          class="q-mx-md"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-icon name="mdi-hazard-lights" color="red" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            Pigeon
          </q-toolbar-title>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered behavior="mobile" @click="leftDrawerOpen = false">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <span class="q-ml-sm">Project manager</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" clickable class="GPL__drawer-item" :to="link.path">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
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

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn round flat color="grey-8" stack no-caps size="26px" link class="GPL__side-btn" to="/home">
            <q-icon size="22px" name="mdi-home" />
            <div class="GPL__side-btn__label">Home</div>
          </q-btn>

          <q-btn round flat color="grey-8" stack no-caps size="26px" class="GPL__side-btn" to="/project-manager">
            <q-icon size="22px" name="mdi-folder-table" />
            <div class="GPL__side-btn__label">Projects</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: false,
      search: '',
      storage: 0.26,
      links1: [
        { icon: 'mdi-home', text: 'Home', path: '/home' },
        { icon: 'mdi-folder-table', text: 'Projects', path: '/project-manager' }
      ]
    };
  }
};
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
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
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
