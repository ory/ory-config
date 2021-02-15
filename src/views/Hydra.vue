<template>
  <div id="hydra">
    <form-generator v-if="remoteData['$id'] !== undefined" :data="remoteData"></form-generator>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import FormGenerator from '@/components/FormGenerator.vue';
import hydra from '@/json/hydra.json';

  @Component({
    components: { FormGenerator },
  })
export default class Hydra extends Vue {
    private remoteData: Record<string, any>;

    constructor() {
      super();
      this.remoteData = hydra;
      // this.getData();
    }

  // eslint-disable-next-line class-methods-use-this
  /* async getData(): Promise<void> {
      const response = await fetch(`${process.env.VUE_APP_HYDRA_SCHEMA}`);
      this.remoteData = await response.json();
      console.debug(this.remoteData);
    } */
}

</script>
