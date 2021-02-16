import GenericFormSection from "@/models/GenericFormSection";

export default interface GenericForm {
  parent: string;
  sections: Array<GenericFormSection>;
};
