<template>
  <div id="export-format">
    <b-select v-model="selectedFormat">
      <option
      v-for="f in formats"
      :value="f"
      :key="f">
        {{f}}
      </option>
    </b-select>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';

  @Component
export default class ExportFormat extends Vue {
    private formats: Array<string>;

    private selectedFormat: string;

    constructor() {
      super();
      this.formats = ['json', 'yaml'];
      this.selectedFormat = 'yaml';
    }

    @Watch('selectedFormat')
    changeSelectedFormat(val: string) {
      this.$emit('callback-format', val);
    }
}

</script>
