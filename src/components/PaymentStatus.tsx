import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PaymentStatusProps {
  status: "processing" | "success" | "error";
  amount: string;
  method: string;
  onReset: () => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({
  status,
  amount,
  method,
  onReset,
}) => {
  const getMethodName = (method: string) => {
    switch (method) {
      case "card":
        return "Банковская карта";
      case "cash":
        return "Наличные";
      case "qr":
        return "QR-код";
      default:
        return method;
    }
  };

  if (status === "processing") {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl animate-spin">⏳</div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Обработка платежа...
        </h2>
        <p className="text-gray-600">
          Сумма: ₽ {amount} • {getMethodName(method)}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full animate-pulse"
            style={{ width: "60%" }}
          ></div>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center space-y-6">
        <div className="text-6xl text-green-500 animate-bounce">✅</div>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Платеж успешно проведен!
            </h2>
            <p className="text-green-600 text-lg">Сумма: ₽ {amount}</p>
            <p className="text-green-600">Способ: {getMethodName(method)}</p>
            <p className="text-sm text-green-500 mt-4">
              Операция №: {Date.now().toString().slice(-8)}
            </p>
          </CardContent>
        </Card>
        <Button
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={onReset}
        >
          Новый платеж
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <div className="text-6xl text-red-500">❌</div>
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-red-700 mb-2">
            Ошибка платежа
          </h2>
          <p className="text-red-600">Не удалось провести операцию</p>
          <p className="text-sm text-red-500 mt-2">
            Проверьте данные и попробуйте снова
          </p>
        </CardContent>
      </Card>
      <Button size="lg" className="w-full" onClick={onReset}>
        Попробовать снова
      </Button>
    </div>
  );
};

export default PaymentStatus;
