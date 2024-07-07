import { useToast } from "@/components/ui/use-toast";
import {
  SaveConfigArgs,
  paymentSession,
  saveConfig,
} from "@/lib/server actions/actions";
import { useMutation } from "@tanstack/react-query";

export const useSaveConfig = (saveConfiguration: Function) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([saveConfiguration(), saveConfig(args)]);
    },
    mutationKey: ["SAVE-CONFIG"],
    onSuccess: () => {
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
  return useMutation({
    mutationFn: (configId: string) => paymentSession({ configId }),
    mutationKey: ["PAYMENT-SESSION"],
    onSuccess: () => {},
    onError: () => {},
  });
};
