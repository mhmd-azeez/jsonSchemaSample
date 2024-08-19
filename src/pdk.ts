/**
 * Validation Error
 */
export class ValidationError {
  // @ts-expect-error TS2564
  location: string;

  // @ts-expect-error TS2564
  message: string;

  static fromJson(obj: any): ValidationError {
    return {
      ...obj,
    };
  }

  static toJson(obj: ValidationError): any {
    return {
      ...obj,
    };
  }
}

/**
 * Validation Result
 */
export class ValidationResult {
  // @ts-expect-error TS2564
  errors: Array<ValidationError>;

  // @ts-expect-error TS2564
  valid: boolean;

  static fromJson(obj: any): ValidationResult {
    return {
      ...obj,
    };
  }

  static toJson(obj: ValidationResult): any {
    return {
      ...obj,
    };
  }
}
