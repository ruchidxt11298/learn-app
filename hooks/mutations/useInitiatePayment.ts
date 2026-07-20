import { useMutation } from "@tanstack/react-query";
import { initiatePayment } from "@/services/payment.service";

export function useInitiatePayment() {
  return useMutation({ mutationFn: initiatePayment });
}
