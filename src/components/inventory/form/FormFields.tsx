
import { memo } from "react";
import BasicFields from "./BasicFields";
import DimensionsFields from "./DimensionsFields";
import PriceFields from "./PriceFields";

interface FormFieldsProps {
  form: any;
  activeTab: string;
}

const FormFields = ({ form, activeTab }: FormFieldsProps) => {
  return (
    <>
      <BasicFields form={form} />
      <DimensionsFields form={form} />
      <PriceFields form={form} />
    </>
  );
};

export default memo(FormFields);
