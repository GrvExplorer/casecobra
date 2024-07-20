"use client";
import { Button } from "@/components/ui/button";
import LoginModal from "@/components/ui/LoginModal";
import { usePaymentSession } from "@/lib/react query/mutations/queryandmutations";
import { useUser } from "@clerk/nextjs";
import { MoveRight } from "lucide-react";
import { useState } from "react";

export default function CreatePaymentPage({ configId }: { configId: string }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { mutate: paymentSession, isPending } = usePaymentSession();

  const { user } = useUser();

  const handleCheckout = () => {
    if (!user) {
      localStorage.setItem("configId", configId);
      setIsLoginModalOpen(true);
    } else {
      paymentSession({ configId });
    }
  };

  return (
    <div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <Button
        onClick={() => {
          handleCheckout();
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
