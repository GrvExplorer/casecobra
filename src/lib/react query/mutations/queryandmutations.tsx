import { useToast } from "@/components/ui/use-toast";
import {
  SaveConfigArgs,
  paymentSession,
  saveConfig,
} from "@/lib/server actions/actions";
import { useMutation } from "@tanstack/react-query";

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

  return useMutation({
    mutationFn: paymentSession,
    mutationKey: ["PAYMENT-SESSION"],
    onSuccess: () => {},
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });
};
