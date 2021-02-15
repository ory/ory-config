<template>
  <div id="kratos">
    <form-generator v-if="remoteData['$id'] !== undefined" :data="remoteData"></form-generator>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import FormGenerator from '@/components/FormGenerator.vue';
import kratos from '@/json/kratos.json';

  @Component({
    components: { FormGenerator },
  })
export default class Kratos extends Vue {
    private remoteData: Record<string, any>;

    constructor() {
      super();
      this.remoteData = kratos;
      /* fetch(`${process.env.VUE_APP_KRATOS_SCHEMA}`)
        .then((response) => response.json())
        // eslint-disable-next-line no-return-assign
        .then((data) => (this.remoteData = data)); */
    }
}

</script>

<style scoped>

</style>
