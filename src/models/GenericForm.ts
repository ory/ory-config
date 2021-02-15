import GenericFormItem from '@/models/GenericFormItem';

export default interface GenericForm {
  section: string;
  fields: Array<GenericFormItem>;
};
