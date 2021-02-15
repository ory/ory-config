import GenericFormItemSetValue from "@/models/GenericFormItemSetValue";

export default interface GenericFormItem {
  name: string;
  value: string;
  type: string;
  description: string;
  defaults: any;
  setValues: GenericFormItemSetValue;
};
