import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CardData {
  number: string;
  expiry: string;
  cvv: string;
  holder: string;
}

interface BankCardFormProps {
  onSubmit: (cardData: CardData) => void;
  loading?: boolean;
}

const BankCardForm: React.FC<BankCardFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const [cardData, setCardData] = useState<CardData>({
    number: "",
    expiry: "",
    cvv: "",
    holder: "",
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleInputChange = (field: keyof CardData, value: string) => {
    let formattedValue = value;

    if (field === "number") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiry") {
      formattedValue = formatExpiry(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/[^0-9]/g, "").slice(0, 3);
    }

    setCardData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cardData);
  };

  const isValid =
    cardData.number.replace(/\s/g, "").length >= 16 &&
    cardData.expiry.length === 5 &&
    cardData.cvv.length === 3 &&
    cardData.holder.trim().length > 0;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>💳</span>
          <span>Данные банковской карты</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер карты
            </label>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardData.number}
              onChange={(e) => handleInputChange("number", e.target.value)}
              maxLength={19}
              className="text-lg tracking-wider"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Срок действия
              </label>
              <Input
                type="text"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={(e) => handleInputChange("expiry", e.target.value)}
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <Input
                type="text"
                placeholder="123"
                value={cardData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength={3}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя держателя карты
            </label>
            <Input
              type="text"
              placeholder="IVAN PETROV"
              value={cardData.holder}
              onChange={(e) =>
                handleInputChange("holder", e.target.value.toUpperCase())
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || loading}
            size="lg"
          >
            {loading ? "Обработка..." : "Оплатить"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BankCardForm;
