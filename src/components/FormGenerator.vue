<template>
  <div id="formGenerator" v-if="formData && formData.length > 0">
      <section>
        <div v-for="obj in formData" :key="obj.section">
          <div class="block">
          <section>
            <div
              class="panel-heading">
              <strong>{{obj.section}}</strong>
            </div>
          </section>
          <div v-for="inner in obj.fields" :key="inner.name">
            <div class="column">
            <form-any-component :item="inner"></form-any-component>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section class="footer">
        <b-button @click="reset">Reset</b-button>
        <b-button @click="save">Save</b-button>
      </section>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import GenericForm from '@/models/GenericForm';
import GenericFormItem from '@/models/GenericFormItem';
import FormAnyComponent from '@/components/FormAnyComponent.vue';
import GenericFormItemSetValue from '@/models/GenericFormItemSetValue';

  @Component({
    components: { FormAnyComponent },
  })
export default class FormGenerator extends Vue {
    @Prop({ required: true }) private data !: Record<string, any>;

    private formData: Array<GenericForm>;

    constructor() {
      super();
      this.formData = [{ section: 'root', fields: [] }];
      this.formData = this.recursiveParseData(this.formData, 'root', this.data.properties);
    }

    reset(): void {
      this.formData = [];
    }

    save(): void {
      this.formData = [];
    }

    /* transformYaml():void {
    }

    transformJson():void {
    }

    transformEnv() {
    } */

    // eslint-disable-next-line max-len
    recursiveParseData(formData: Array<GenericForm>, section: string, obj: Record<string, any>): Array<GenericForm> {
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const key in obj) {
        console.debug(key, obj[key]);
        // eslint-disable-next-line no-prototype-builtins
        if (obj[key].hasOwnProperty('type')) {
          if (obj[key].type === 'object') {
            this.recursiveParseData(formData, key, obj[key].properties);
          } else {
            let defaults: any = null;
            // eslint-disable-next-line no-prototype-builtins
            if (obj[key].hasOwnProperty('default')) {
              defaults = obj[key].default;
            }

            let setValues: GenericFormItemSetValue = {
              type: '',
              value: null,
            };

            let value = null;
            let type = '';
            // eslint-disable-next-line no-prototype-builtins
            if (obj[key].hasOwnProperty('enum')) {
              value = obj[key].enum;
            }
            // eslint-disable-next-line no-prototype-builtins
            if (obj[key].hasOwnProperty('type')) {
              type = obj[key].type;
            }

            setValues = {
              value,
              type,
            };

            let description = '';
            // eslint-disable-next-line no-prototype-builtins
            if (obj[key].hasOwnProperty('description')) {
              description = obj[key].description;
            }

            const field: GenericFormItem = {
              name: key,
              type: obj[key].type,
              value: obj[key],
              defaults,
              setValues,
              description,
            };

            this.appendToSection(formData, section, field);
          }
        }
      }
      return formData;
    }

    // eslint-disable-next-line max-len,class-methods-use-this
    appendToSection(formData: Array<GenericForm>, section: string, field: GenericFormItem): void {
      console.debug(formData);
      const inx = formData.findIndex(((value) => value.section === section));
      if (inx > -1) {
        formData[inx].fields.push(field);
      } else {
        formData.push({
          fields: [field],
          section,
        });
      }
    }
}
</script>
