<template>
  <q-card-section class="full-height full-width row justify-center items-center">
    <div class="text-align-center">
      <q-btn
        class="q-my-sm"
        outline="outline"
        no-caps="no-caps"
        color="primary"
        size="lg"
        label="Login with identity"
        :loading="loading"
        @click="login"
      >
        <template v-slot:loading>
          <q-spinner-facebook></q-spinner-facebook>
        </template>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script src="./oidc-login"></script>
