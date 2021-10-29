<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-grey-2 window-height window-width row justify-center items-center">
        <q-card class="my-card shadow-10">
          <q-card-section class="full-height" horizontal="horizontal">
            <q-card-section class="bg-primary col-5 full-height row justify-center items-center" v-if="$q.screen.gt.xs">
              <div class="text-align-center text-white">
                <q-icon name="mdi-chart-donut-variant" size="200px"></q-icon>
                <div class="text-h4 text-bold">Project Manager</div>
                <div class="text-subtitle1">A sample project manager app.</div>
              </div>
            </q-card-section>
            <q-card-section class="full-height full-width row justify-center items-center">
              <div class="text-align-center">
                <q-spinner-facebook
                  class="full-width"
                  unelevated="unelevated"
                  color="primary"
                  size="lg"
                  label="Login"
                ></q-spinner-facebook>
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component';

class Props {
  readonly label = prop<string>({
    default: () => '',
  });
}

export default class AppSplashScreen extends Vue.with(Props) {}
</script>

<style scoped>
.my-card {
  width: 90%;
  height: 90%;
  max-height: 720px;
  max-width: 1280px;
}
</style>
