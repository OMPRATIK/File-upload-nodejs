// ES6 __diranme and __filename ------------
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
//--------------------------------------------

export { __dirname, __filename };
