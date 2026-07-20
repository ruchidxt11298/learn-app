import { useMutation } from "@tanstack/react-query";
import { subscribeNewsletter } from "@/services/newsletter.service";

export function useSubscribeNewsletter() {
  return useMutation({ mutationFn: subscribeNewsletter });
}
