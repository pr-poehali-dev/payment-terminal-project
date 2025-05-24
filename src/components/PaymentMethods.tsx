import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentMethodsProps {
  amount: string;
  onMethodSelect: (method: string) => void;
  onBack: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  amount,
  onMethodSelect,
  onBack,
}) => {
  const methods = [
    {
      id: "card",
      title: "Банковская карта",
      icon: "💳",
      description: "Visa, MasterCard, МИР",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "cash",
      title: "Наличные",
      icon: "💵",
      description: "Купюры и монеты",
      color: "from-green-500 to-green-600",
    },
    {
      id: "qr",
      title: "QR-код",
      icon: "📱",
      description: "СБП, Тинькофф, Сбер",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Выберите способ оплаты
        </h2>
        <div className="text-3xl font-bold text-blue-600">₽ {amount}</div>
      </div>

      <Separator />

      <div className="grid gap-4">
        {methods.map((method) => (
          <Card
            key={method.id}
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
            onClick={() => onMethodSelect(method.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-2xl`}
                >
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {method.title}
                  </h3>
                  <p className="text-gray-600">{method.description}</p>
                </div>
                <div className="text-2xl text-gray-400">→</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" size="lg" className="w-full" onClick={onBack}>
        ← Назад к вводу суммы
      </Button>
    </div>
  );
};

export default PaymentMethods;
