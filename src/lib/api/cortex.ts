import { api }  from "@/lib/axios";

export function updateCortexSettings(
  settingsData: { is_awakened: boolean; auto_post_enabled: boolean }
) {
  return api.put(`cortex/update/settings`, settingsData);
}
