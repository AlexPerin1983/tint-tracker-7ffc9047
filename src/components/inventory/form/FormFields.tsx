
import { memo } from "react";
import BasicFields from "./BasicFields";
import DimensionsFields from "./DimensionsFields";
import PriceFields from "./PriceFields";

interface FormFieldsProps {
  form: any;
  activeTab: string;
}

const FormFields = ({ form, activeTab }: FormFieldsProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "basic":
        return <BasicFields form={form} />;
      case "dimensions":
        return <DimensionsFields form={form} />;
      case "price":
        return <PriceFields form={form} />;
      default:
        return null;
    }
  };

  return renderContent();
};

export default memo(FormFields);
