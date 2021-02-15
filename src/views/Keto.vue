<template>
  <div id="keto">
    <form-generator v-if="remoteData['$id'] !== undefined" :data="remoteData"></form-generator>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import FormGenerator from '@/components/FormGenerator.vue';
import keto from '@/json/keto.json';

  @Component({
    components: { FormGenerator },
  })
export default class Keto extends Vue {
    private remoteData: Record<string, any>;

    constructor() {
      super();
      this.remoteData = keto;
      /* fetch(`${process.env.VUE_APP_KETO_SCHEMA}`)
        .then((response) => response.json())
        // eslint-disable-next-line no-return-assign
        .then((data) => (this.remoteData = data)); */
    }
}

</script>
