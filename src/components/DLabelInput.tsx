import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface LabelInputProps {
  label: string;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

const DLabelInput: React.FC<LabelInputProps> = ({
  label,
  defaultValue,
  onValueChange,
}) => {
  const handleInputChange = (e) => {
    if (onValueChange) onValueChange(e.target.value);
  };
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        type="number"
        defaultValue={defaultValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DLabelInput;
