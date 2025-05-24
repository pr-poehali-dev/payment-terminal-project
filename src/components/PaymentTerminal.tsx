import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NumericKeypad from "./NumericKeypad";
import PaymentMethods from "./PaymentMethods";
import PaymentStatus from "./PaymentStatus";

type PaymentStep = "amount" | "method" | "processing" | "success" | "error";

const PaymentTerminal = () => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("amount");
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleAmountChange = (value: string) => {
    if (value === "clear") {
      setAmount("");
    } else if (value === "delete") {
      setAmount((prev) => prev.slice(0, -1));
    } else if (value === "confirm" && amount) {
      setCurrentStep("method");
    } else if (value !== "confirm") {
      if (amount.length < 8) {
        setAmount((prev) => prev + value);
      }
    }
  };

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setCurrentStep("processing");

    // Имитация обработки платежа
    setTimeout(() => {
      setCurrentStep(Math.random() > 0.2 ? "success" : "error");
    }, 3000);
  };

  const resetTerminal = () => {
    setCurrentStep("amount");
    setAmount("");
    setSelectedMethod("");
  };

  const formatAmount = (value: string) => {
    if (!value) return "0.00";
    const num = parseInt(value) / 100;
    return num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            💳 Терминал Оплаты
          </CardTitle>
          <p className="text-blue-100 mt-2">Быстро • Безопасно • Надежно</p>
        </CardHeader>

        <CardContent className="p-8">
          {currentStep === "amount" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Введите сумму к оплате
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    ₽ {formatAmount(amount)}
                  </div>
                  <div className="text-gray-500">Российские рубли</div>
                </div>
              </div>

              <Separator />

              <NumericKeypad
                onButtonClick={handleAmountChange}
                showConfirm={!!amount}
              />
            </div>
          )}

          {currentStep === "method" && (
            <PaymentMethods
              amount={formatAmount(amount)}
              onMethodSelect={handleMethodSelect}
              onBack={() => setCurrentStep("amount")}
            />
          )}

          {(currentStep === "processing" ||
            currentStep === "success" ||
            currentStep === "error") && (
            <PaymentStatus
              status={currentStep}
              amount={formatAmount(amount)}
              method={selectedMethod}
              onReset={resetTerminal}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTerminal;
