import { registerProvider } from "./index";
import * as Apple from "../apple/update";

registerProvider({
  name: "apple",

  async updatePass(membership) {
    return Apple.updatePass(membership);
  },
});