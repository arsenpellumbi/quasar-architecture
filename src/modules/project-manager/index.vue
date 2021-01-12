<template>
  <component :is="'main-layout'">
    <template v-slot:default>
      <router-view></router-view>
    </template>
  </component>
</template>
