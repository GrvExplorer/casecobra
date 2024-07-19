import { useToast } from "@/components/ui/use-toast";
import {
  SaveConfigArgs,
  paymentSession,
  saveConfig,
} from "@/lib/server actions/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Orders } from "razorpay/dist/types/orders";

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
          amount: createdOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: createdOrder.currency,
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: createdOrder.id,
          handler: async function (response: any) {
            const body = {
              ...response,
            };
            console.log(body);
          },
          prefill: {
            name: "Web Dev Matrix",
            email: "webdevmatrix@example.com",
            contact: "9000000000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong 51 from queryandmutations",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });
};
