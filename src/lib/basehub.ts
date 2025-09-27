import { basehub as createBasehub } from "basehub";

export const basehub = createBasehub({
  token: import.meta.env.DEV
    ? import.meta.env.BASEHUB_TOKEN
    : process.env.BASEHUB_TOKEN!,
});
