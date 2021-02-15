<template>
  <div id="hydra">
    <form-generator v-if="remoteData['$id'] !== undefined" :data="remoteData"></form-generator>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import FormGenerator from '@/components/FormGenerator.vue';
import oathkeeper from '@/json/oathkeeper.json';

  @Component({
    components: { FormGenerator },
  })
export default class Hydra extends Vue {
    private remoteData: Record<string, any>;

    constructor() {
      super();
      this.remoteData = oathkeeper;
      /* fetch(`${process.env.VUE_APP_OATHKEEPER_SCHEMA}`)
        .then((response) => response.json())
        // eslint-disable-next-line no-return-assign
        .then((data) => (this.remoteData = data)); */
    }
}

</script>
