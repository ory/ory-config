<template>
  <div id="export-format">
    <b-select :value="formats" v-model="selectedFormat"></b-select>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

  @Component
export default class ExportFormat extends Vue {
    private formats: Array<string>;

    private selectedFormat: string;

    constructor() {
      super();
      this.formats = ['json', 'yaml'];
      this.selectedFormat = '';
    }
}

</script>
