import { HexColorPicker } from "react-colorful";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PopoverPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const PopoverPicker = ({ color, onChange }: PopoverPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="flex justify-end rounded-md picker min-w-10 min-h-10"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="flex justify-center w-full">
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
};
