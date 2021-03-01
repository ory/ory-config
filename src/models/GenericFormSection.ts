import GenericFormItem from '@/models/GenericFormItem';

export default interface GenericFormSection {
  section: string;
  fields: Array<GenericFormItem>;
};
