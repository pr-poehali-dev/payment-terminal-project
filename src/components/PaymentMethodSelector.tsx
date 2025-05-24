import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type PaymentMethodType =
  | "bank_card"
  | "yoo_money"
  | "sberbank"
  | "tinkoff_bank"
  | "mobile_balance"
  | "cash";

interface PaymentMethod {
  type: PaymentMethodType;
  title: string;
  description: string;
  icon: string;
  available: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    type: "bank_card",
    title: "Банковская карта",
    description: "Visa, Mastercard, МИР",
    icon: "💳",
    available: true,
  },
  {
    type: "yoo_money",
    title: "ЮMoney",
    description: "Электронный кошелек",
    icon: "💰",
    available: true,
  },
  {
    type: "sberbank",
    title: "SberPay",
    description: "Оплата через Сбербанк",
    icon: "🟢",
    available: true,
  },
  {
    type: "tinkoff_bank",
    title: "T-Pay",
    description: "Оплата через Т-Банк",
    icon: "🟡",
    available: true,
  },
  {
    type: "mobile_balance",
    title: "Баланс телефона",
    description: "Оплата с мобильного",
    icon: "📱",
    available: true,
  },
  {
    type: "cash",
    title: "Наличные",
    description: "Через терминалы",
    icon: "💵",
    available: true,
  },
];

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethodType | null;
  onMethodSelect: (method: PaymentMethodType) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Выберите способ оплаты
      </h3>

      <div className="grid gap-3">
        {paymentMethods.map((method) => (
          <Card
            key={method.type}
            className={`cursor-pointer transition-all duration-200 ${
              selectedMethod === method.type
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "hover:bg-gray-50"
            } ${!method.available ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => method.available && onMethodSelect(method.type)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{method.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {method.title}
                  </h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                {selectedMethod === method.type && (
                  <div className="text-blue-500 text-xl">✓</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
