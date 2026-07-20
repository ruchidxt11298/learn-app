import { simulateNetwork } from "@/lib/mockDelay";

export async function subscribeNewsletter(email: string): Promise<{ success: true }> {
  void email; // MOCK now. REAL later: await api.post('/newsletter', { email });
  return simulateNetwork({ success: true as const }, 600);
}
