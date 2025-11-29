export type CortexSettings = {
  is_awakened: boolean;
  auto_post_enabled: boolean;
}

export type Cortex = {
  public_id: string;
  author_public_id: string;
  setting: CortexSettings;
}