"use client";
import { Button } from "@/components/ui/button";
import { usePaymentSession } from "@/lib/react query/mutations/queryandmutations";
import { MoveRight } from "lucide-react";

export default function CreatePaymentPage({ configId }: { configId: string }) {
  const { mutateAsync: paymentSession, isPending } = usePaymentSession();

  return (
    <div>
      <Button
        onClick={() => {
          localStorage.setItem("configId", configId);
          paymentSession(configId);
        }}
        isLoading={isPending}
        isLoadingText="Loading"
      >
        Check Out
        <span>
          <MoveRight className="pl-2 text-2xl" />
        </span>
      </Button>
    </div>
  );
}
