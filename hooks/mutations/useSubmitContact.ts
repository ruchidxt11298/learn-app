import { useMutation } from "@tanstack/react-query";
import { submitContactMessage } from "@/services/contact.service";

export function useSubmitContact() {
  return useMutation({ mutationFn: submitContactMessage });
}
