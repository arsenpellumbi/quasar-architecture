<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    :class="($q.screen.lt.md && 'bg-primary') || 'bg-grey-2'"
  >
    <q-card class="my-card shadow-10">
      <q-card-section class="full-height" horizontal="horizontal">
        <q-card-section class="bg-primary col-5 full-height row justify-center items-center" v-if="$q.screen.gt.sm">
          <div class="text-align-center text-white">
            <q-icon name="mdi-chart-donut-variant" size="200px"></q-icon>
            <div class="text-h4 text-bold">Project Manager</div>
            <div class="text-subtitle1">A sample project manager app.</div>
          </div>
        </q-card-section>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.my-card {
  width: 90%;
  height: 90%;
  max-height: 720px;
  max-width: 1280px;
}
</style>
