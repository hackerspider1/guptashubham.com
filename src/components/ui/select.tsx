import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

const Select = ({ value, onValueChange, options }: any) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="flex justify-between items-center p-2 bg-[#2d2f31] text-[#98c379] rounded-md w-full">
        <SelectPrimitive.Value placeholder="Select a payload list" />
        <ChevronDown className="w-4 h-4 text-[#98c379]" />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content className="bg-[#181a1b] text-white rounded-md p-1 shadow-md">
        <SelectPrimitive.Viewport>
          {options.map((option: string) => (
            <SelectPrimitive.Item
              key={option}
              value={option}
              className="px-3 py-2 cursor-pointer hover:bg-[#2d2f31] rounded-md"
            >
              <SelectPrimitive.ItemText>{option}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator>
                <Check className="w-4 h-4 text-[#98c379]" />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
};

export default Select;