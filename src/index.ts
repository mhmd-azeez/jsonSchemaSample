import * as main from "./main";

import { ValidationError, ValidationResult } from "./pdk";

export function validate(): number {
  const input = Host.inputString();

  const output = main.validateImpl(input);

  const untypedOutput = ValidationResult.toJson(output);
  Host.outputString(JSON.stringify(untypedOutput));

  return 0;
}
