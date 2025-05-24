import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PaymentMethodSelector, {
  PaymentMethodType,
} from "@/components/PaymentMethodSelector";
import BankCardForm from "@/components/BankCardForm";

type PaymentStep =
  | "ready"
  | "method_selection"
  | "card_input"
  | "processing"
  | "success"
  | "error";

const PaymentTerminal = () => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("ready");
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType | null>(null);
  const amount = "400.00";

  const handleStartPayment = () => {
    setCurrentStep("method_selection");
  };

  const handleMethodSelect = (method: PaymentMethodType) => {
    setSelectedMethod(method);
    if (method === "bank_card") {
      setCurrentStep("card_input");
    } else {
      // Для других методов сразу переходим к обработке
      processPayment(method);
    }
  };

  const handleCardSubmit = (cardData: any) => {
    processPayment("bank_card", cardData);
  };

  const processPayment = (method: PaymentMethodType, cardData?: any) => {
    setCurrentStep("processing");

    // Имитация создания платежа через YooKassa API
    setTimeout(() => {
      setCurrentStep(Math.random() > 0.2 ? "success" : "error");
    }, 3000);
  };

  const resetTerminal = () => {
    setCurrentStep("ready");
    setSelectedMethod(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
      <Card className="w-full max-w-lg bg-white shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            💳 Оплата через ЮКасса
          </CardTitle>
          <p className="text-blue-100 mt-2">Быстро • Безопасно • Надежно</p>
        </CardHeader>

        <CardContent className="p-8">
          {currentStep === "ready" && (
            <div className="space-y-6 text-center">
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ₽ {amount}
                </div>
                <div className="text-gray-500">К оплате</div>
              </div>

              <Separator />

              <Button
                size="lg"
                className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700"
                onClick={handleStartPayment}
              >
                Выбрать способ оплаты
              </Button>
            </div>
          )}

          {currentStep === "method_selection" && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900">
                  ₽ {amount}
                </div>
                <div className="text-gray-500">К оплате</div>
              </div>

              <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onMethodSelect={handleMethodSelect}
              />

              <Button
                variant="outline"
                className="w-full"
                onClick={resetTerminal}
              >
                Отмена
              </Button>
            </div>
          )}

          {currentStep === "card_input" && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900">
                  ₽ {amount}
                </div>
                <div className="text-gray-500">Оплата банковской картой</div>
              </div>

              <BankCardForm onSubmit={handleCardSubmit} loading={false} />

              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setCurrentStep("method_selection")}
              >
                Назад к способам оплаты
              </Button>
            </div>
          )}

          {currentStep === "processing" && (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-spin">⏳</div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Обработка платежа...
              </h2>
              <p className="text-gray-600">
                Сумма: ₽ {amount} •{" "}
                {selectedMethod === "bank_card"
                  ? "Банковская карта"
                  : "Выбранный способ"}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full animate-pulse"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          )}

          {currentStep === "success" && (
            <div className="text-center space-y-6">
              <div className="text-6xl text-green-500 animate-bounce">✅</div>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-green-700 mb-2">
                    Платеж успешно проведен!
                  </h2>
                  <p className="text-green-600 text-lg">Сумма: ₽ {amount}</p>
                  <p className="text-green-600">
                    Способ:{" "}
                    {selectedMethod === "bank_card"
                      ? "Банковская карта"
                      : "Выбранный способ"}
                  </p>
                  <p className="text-sm text-green-500 mt-4">
                    Операция №: {Date.now().toString().slice(-8)}
                  </p>
                </CardContent>
              </Card>
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={resetTerminal}
              >
                Новый платеж
              </Button>
            </div>
          )}

          {currentStep === "error" && (
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
              <Button size="lg" className="w-full" onClick={resetTerminal}>
                Попробовать снова
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTerminal;
