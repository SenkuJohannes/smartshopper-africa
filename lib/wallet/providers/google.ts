import { registerProvider } from "./index";
import * as Google from "../google/update";

registerProvider({
  name: "google",

  async updatePass(membership) {
    return Google.updatePass(membership);
  },
});