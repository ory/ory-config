<template>
  <div id="hydra">
    <div class="columns is-desktop">
      <div class="column">
        <export-format @callback-format="callbackFormat"></export-format>
        <config-view :val="configData" :format="format"></config-view>
      </div>
      <div class="column is-two-thirds" style="max-height: 80vh;overflow-y: scroll">
          <form-generator v-if="remoteData['$id'] !== undefined" :data="remoteData"
                          @callback-config="callbackConfig"></form-generator>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import FormGenerator from '@/components/FormGenerator.vue';
import hydra from '@/json/hydra.json';
import ConfigView from '@/components/ConfigView.vue';
import ExportFormat from '@/components/ExportFormat.vue';

  @Component({
    components: { ExportFormat, ConfigView, FormGenerator },
  })
export default class Hydra extends Vue {
    private remoteData: Record<string, any>;

    private configData: string;

    private format: string;

    constructor() {
      super();
      this.remoteData = hydra;
      this.configData = '';
      this.format = 'text/yaml';
    }

    callbackConfig(data: string) {
      this.configData = data;
    }

    callbackFormat(format: string) {
      this.format = format;
    }
}

</script>
