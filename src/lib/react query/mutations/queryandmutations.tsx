import { useToast } from "@/components/ui/use-toast";
import {
  SaveConfigArgs,
  getPaymentStatus,
  paymentSession,
  saveConfig,
} from "@/lib/server actions/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any; // or the type of Razorpay if you have it
  }
}

export const useSaveConfig = (saveConfiguration: any) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), saveConfig(args)]);
    },
    mutationKey: ["SAVE-CONFIG"],
    onSuccess: (data) => {
      toast({
        title: "Successfully selected the options and cropped the image",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const usePaymentSession = () => {
  // TODO: toast no  popup on error
  const { toast } = useToast();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ configId }: { configId: string }) =>
      paymentSession({ configId }),
    mutationKey: ["PAYMENT-SESSION"],
    onSuccess: ({ createdOrder }: any) => {
      console.log(
        "🚀 ~ file: queryandmutations.tsx:41 ~ usePaymentSession ~ createdOrder:",
        createdOrder,
      );

      if (createdOrder) {
        var options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: createdOrder.amount,
          currency: createdOrder.currency,
          name: "Gaurav Verma",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: createdOrder.id,
          handler: async function (response: any) {

            router.push(
              `/payment/success?orderId=${response.razorpay_order_id}`,
            );

            await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/payment`,
              {
                method: "POST",
                body: JSON.stringify(response),
                mode: "same-origin",
              },
            );

  
          },
          prefill: {
            name: "Web Dev Matrix",
            email: "webdevmatrix@example.com",
            contact: "9000000000",
          },
          notes: {
            orderId: createdOrder.notes.orderId,
            userId: createdOrder.notes.userId,
          },
          theme: {
            color: "#3399cc",
          },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
        });
        rzp1.open();
      }
    },
    onError: (error) => {
      console.log(
        "🚀 ~ file: queryandmutations.tsx:93 ~ usePaymentSession ~ error:",
        error,
      );

      toast({
        title: "Something went wrong.",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useGetPaymentStatus = (orderId: string) => {
  return useQuery({
    queryKey: ["GET-PAYMENT-STATUS"],
    queryFn: async () => getPaymentStatus(orderId),

    // keep trying until the query does not return order

    retry: true,
    retryDelay: 500,
  });
};
