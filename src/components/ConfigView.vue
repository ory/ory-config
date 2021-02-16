<template>
  <div id="config-view">
    <b-select v-model="theme">
      <option
        v-for="theme in themes"
        :value="theme"
        :key="theme">
        {{ theme }}
      </option>
    </b-select>
    <!-- Two-way Data-Binding -->
    <div class="level-left">
      <codemirror v-model="val" :options="options"/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { codemirror } from 'vue-codemirror';

// import base style
import 'codemirror/lib/codemirror.css';

  @Component({
    components: {
      codemirror,
    },
  })
export default class ConfigView extends Vue {
    @Prop({ required: true }) private val: string;

    @Prop({ required: true }) private format: string;

    private options: Record<string, any>;

    private theme: string;

    private themes: Array<string>;

    private codeFormat: string;

    constructor() {
      super();
      this.val = '';
      this.format = '';
      this.codeFormat = 'text/x-yaml';
      this.theme = 'base16-dark';
      this.themes = [
        '3024-day',
        '3024-night',
        'abcdef',
        'ambiance-mobile',
        'ambiance',
        'ayu-dark',
        'base16-dark',
        'base16-light',
        'bespin',
        'blackboard',
        'cobalt',
        'colorforth',
        'darcula',
        'dracula',
        'duotone-dark',
        'duotone-light',
        'eclipse',
        'elegant',
        'erlang-dark',
        'gruvbox-dark',
        'hopscotch',
        'icecoder',
        'idea',
        'isotope',
        'lesser-dark',
        'liquibyte',
        'lucario',
        'material-darker',
        'material-ocean',
        'material-palenight',
        'material',
        'mbo',
        'mdn-like',
        'midnight',
        'monokai',
        'moxer',
        'neat',
        'neo',
        'night',
        'nord',
        'oceanic-next',
        'panda-syntax',
        'paraiso-dark',
        'pastel-on-dark',
        'railscasts',
        'rubyblue',
        'seti',
        'shadowfox',
        'solarized',
        'ssms',
        'the-matrix',
        'tomorrow-night-bright',
        'tomorrow-night-eighties',
        'ttcn',
        'twilight',
        'vibrant-ink',
        'xq-dark',
        'xq-light',
        'yeti',
        'yonce',
        'zenburn',
      ];
      this.options = {
        tabSize: 4,
        mode: `text/x-${this.codeFormat}`,
        theme: this.theme,
        lineNumbers: true,
        line: true,
        lint: true,
      };
    }

    @Watch('format')
    changeFormat(val: string) {
      this.codeFormat = val;
    }
}
</script>
