<template>
  <div id="formGenerator" v-if="formData && formData.length > 0">
      <div v-for="parent in formData" :key="parent.parent">
        <div class="tile is-ancestor is-vertical">
          <div v-if="parent.parent !== ''"
            class="panel-heading">
            <strong>{{parent.parent}}</strong>
          </div>

          <div v-for="child in parent.sections" :key="child.section">
            <section>
            <div class="tile is-parent">
              <div
                v-if="child.section !== '' && parent.parent !== child.section"
                class="panel-tabs">
                <strong>{{child.section}}</strong>
              </div>
            </div>
            <div class="tile is-vertical is-child">
              <div v-for="inner in child.fields" :key="inner.name">
                <form-any-component @callback-item="callbackItem"
                                    :item="inner"
                                    :section="child.section"
                                    :parent="parent.parent">

                </form-any-component>
              </div>
            </div>
            </section>
          </div>
        </div>
      </div>

    <section class="footer">
      <b-button @click="reset">Reset</b-button>
      <b-button @click="save">Save</b-button>
    </section>
  </div>
</template>

<script lang="ts">

import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
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
      this.formData = [{ parent: '', sections: [] }];
      this.formData = this.recursiveParseData(this.formData, '', '', this.data.properties);
    }

    @Watch('formData', { deep: true })
    changeFormData(val: Array<GenericForm>) {
      // TODO: transform the data back into a key-value pair json structure
      this.$emit('callback-form', val);
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

    callbackItem({ parent, section, item }:
                   {parent: string; section: string; item: GenericFormItem}): void {
      const parentIndex = this.formData.findIndex((value) => value.parent === parent);

      if (parentIndex > -1) {
        const sectionIndex = this.formData[parentIndex].sections
          .findIndex((value) => value.section === section);
        if (sectionIndex > -1) {
          const itemIndex = this.formData[parentIndex].sections[sectionIndex].fields
            .findIndex((value) => value.name === item.name);
          if (itemIndex > -1) {
            this.formData[parentIndex].sections[sectionIndex].fields[itemIndex] = item;
          }
        }
      }
    }

    // eslint-disable-next-line max-len
    recursiveParseData(formData: Array<GenericForm>, parent: string, section: string, obj: Record<string, any>): Array<GenericForm> {
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj[key].hasOwnProperty('type')) {
          if (obj[key].type === 'object') {
            if (parent === '') {
              this.recursiveParseData(formData, key, key, obj[key].properties);
            } else {
              this.recursiveParseData(formData, parent, key, obj[key].properties);
            }
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

            this.appendToSection(formData, parent, section, field);
          }
        }
      }
      return formData;
    }

    // eslint-disable-next-line max-len,class-methods-use-this
    appendToSection(formData: Array<GenericForm>, parent: string, section: string, field: GenericFormItem): void {
      const parentIndex = formData.findIndex((value) => value.parent === parent);

      if (parentIndex > -1) {
        const childIndex = formData[parentIndex].sections
          .findIndex(((value) => value.section === section));
        if (childIndex > -1) {
          formData[parentIndex].sections[childIndex].fields.push(field);
        } else {
          formData[parentIndex].sections.push({
            fields: [field],
            section,
          });
        }
      } else {
        formData.push({
          parent,
          sections: [{
            fields: [field],
            section,
          }],
        });
      }
    }
}
</script>
