import React from "react";
import { Button } from "@/components/ui/button";

interface NumericKeypadProps {
  onButtonClick: (value: string) => void;
  showConfirm: boolean;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onButtonClick,
  showConfirm,
}) => {
  const buttons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["clear", "0", "delete"],
  ];

  const getButtonText = (value: string) => {
    switch (value) {
      case "clear":
        return "Очистить";
      case "delete":
        return "⌫";
      case "confirm":
        return "Подтвердить";
      default:
        return value;
    }
  };

  const getButtonVariant = (value: string) => {
    if (value === "clear") return "destructive";
    if (value === "delete") return "outline";
    if (value === "confirm") return "default";
    return "secondary";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {buttons.flat().map((value, index) => (
          <Button
            key={index}
            variant={getButtonVariant(value)}
            size="lg"
            className="h-16 text-xl font-semibold"
            onClick={() => onButtonClick(value)}
          >
            {getButtonText(value)}
          </Button>
        ))}
      </div>

      {showConfirm && (
        <Button
          variant="default"
          size="lg"
          className="w-full h-16 text-xl font-bold bg-green-600 hover:bg-green-700"
          onClick={() => onButtonClick("confirm")}
        >
          ✓ Подтвердить сумму
        </Button>
      )}
    </div>
  );
};

export default NumericKeypad;
