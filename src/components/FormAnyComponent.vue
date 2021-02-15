<template>
  <div id="formAnyComponent" v-if="item !== null">

    <div class="field">
      <b-field :label="item.name" :message="item.description">
        <div v-if="item.type === 'boolean'">
          <b-checkbox v-model="val"></b-checkbox>
        </div>
        <div v-if="item.type === 'string'">
          <div v-if="item.setValues.value !== null && item.setValues.value.length > 0">
            <b-select v-model="val">
              <option
                v-for="option in item.setValues.value"
                :value="option"
                :key="option">
                {{ option }}
              </option>
            </b-select>
          </div>
          <div v-else>
            <b-input v-model="val"></b-input>
          </div>
        </div>
        <div v-if="item.type === 'integer'">
          <b-numberinput v-model="val"></b-numberinput>
        </div>
        <div v-if="item.type === 'array'">
          <div v-if="item.setValues.value !== null && item.setValues.value.length > 0">
            <b-select v-model="val">
              <option
                v-for="option in item.setValues.value"
                :value="option"
                :key="option">
                {{ option }}
              </option>
            </b-select>
          </div>
          <div v-else>
            <b-taginput
              v-model="val"
              ellipsis
              icon="label"
              placeholder="Add a variable"
              aria-close-label="Delete this tag">
            </b-taginput>
            <p class="content"><b>Variables:</b> {{ val }}</p>
          </div>
        </div>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import GenericFormItem from '@/models/GenericFormItem';

  @Component
export default class FormAnyComponent extends Vue {
    @Prop({ required: true }) private item !: GenericFormItem;

    private val: any;

    private default: any;

    constructor() {
      super();
      switch (this.item.type) {
        case 'array':
          this.val = [];
          break;
        case 'string':
          this.val = '';
          break;
        case 'boolean':
          this.val = false;
          break;
        case 'integer':
          this.val = 0;
          break;
        default:
          this.val = null;
      }
      this.default = null;
      if (this.item.defaults !== null) {
        this.val = this.item.defaults;
      }
    }
}

</script>
