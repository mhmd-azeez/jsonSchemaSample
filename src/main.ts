import { ValidationError, ValidationResult } from "./pdk";
import Ajv from "ajv";
import YAML from "js-yaml"

const jsonSchema = `
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "version": {
      "$ref": "#/$defs/XtpVersion"
    }
  },
  "required": [
    "version"
  ],
  "allOf": [
    {
      "if": {
        "properties": {
          "version": {
            "const": "v0"
          }
        }
      },
      "then": {
        "properties": {
          "exports": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "version": {
            "const": "v0"
          }
        },
        "required": [
          "exports"
        ],
        "additionalProperties": false
      }
    },
    {
      "if": {
        "properties": {
          "version": {
            "const": "v1-draft"
          }
        }
      },
      "then": {
        "properties": {
          "version": {
            "$ref": "#/$defs/XtpVersion"
          },
          "exports": {
            "type": "object",
            "patternProperties": {
              "^[a-zA-Z_$][a-zA-Z0-9_$]*$": {
                "$ref": "#/$defs/Export"
              }
            }
          },
          "imports": {
            "patternProperties": {
              "^[a-zA-Z_$][a-zA-Z0-9_$]*$": {
                "$ref": "#/$defs/Import"
              }
            },
            "type": "object"
          },
          "components": {
            "type": "object",
            "properties": {
              "schemas": {
                "type": "object",
                "patternProperties": {
                  "^[a-zA-Z_$][a-zA-Z0-9_$]*$": {
                    "$ref": "#/$defs/Schema"
                  }
                },
                "additionalProperties": false
              }
            },
            "required": [
              "schemas"
            ],
            "additionalProperties": false
          }
        },
        "required": [
          "exports"
        ],
        "additionalProperties": false
      }
    }
  ],
  "$defs": {
    "XtpVersion": {
      "type": "string",
      "enum": [
        "v0",
        "v1-draft"
      ]
    },
    "Export": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "codeSamples": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/CodeSample"
          }
        },
        "input": {
          "$ref": "#/$defs/Parameter"
        },
        "output": {
          "$ref": "#/$defs/Parameter"
        }
      },
      "additionalProperties": false
    },
    "CodeSample": {
      "type": "object",
      "properties": {
        "lang": {
          "type": "string",
          "enum": [
            "typescript"
          ]
        },
        "source": {
          "type": "string"
        },
        "label": {
          "type": "string"
        }
      },
      "required": [
        "lang",
        "source"
      ],
      "additionalProperties": false
    },
    "Import": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "input": {
          "$ref": "#/$defs/Parameter"
        },
        "output": {
          "$ref": "#/$defs/Parameter"
        }
      },
      "additionalProperties": false
    },
    "Schema": {
      "oneOf": [
        {
          "$ref": "#/$defs/ObjectSchema"
        },
        {
          "$ref": "#/$defs/EnumSchema"
        }
      ]
    },
    "ObjectSchema": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string"
        },
        "properties": {
          "patternProperties": {
            "^[a-zA-Z_$][a-zA-Z0-9_$]*$": {
              "$ref": "#/$defs/Property"
            }
          }
        }
      },
      "required": [
        "description",
        "properties"
      ],
      "additionalProperties": false
    },
    "EnumSchema": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": [
            "string"
          ]
        },
        "description": {
          "type": "string"
        },
        "enum": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "enum"
      ],
      "additionalProperties": false
    },
    "Parameter": {
      "oneOf": [
        {
          "$ref": "#/$defs/ValueParameter"
        },
        {
          "$ref": "#/$defs/RefParameter"
        }
      ]
    },
    "RefParameter": {
      "type": "object",
      "properties": {
        "$ref": {
          "$ref": "#/$defs/SchemaReference"
        },
        "description": {
          "type": "string"
        },
        "nullable": {
          "type": "boolean",
          "default": false
        },
        "contentType": {
          "$ref": "#/$defs/ContentType"
        }
      },
      "required": [
        "$ref",
        "contentType"
      ],
      "additionalProperties": false
    },
    "ValueParameter": {
      "type": "object",
      "properties": {
        "contentType": {
          "$ref": "#/$defs/ContentType"
        },
        "type": {
          "$ref": "#/$defs/XtpType"
        },
        "format": {
          "$ref": "#/$defs/XtpFormat"
        },
        "nullable": {
          "type": "boolean",
          "default": false
        },
        "description": {
          "type": "string"
        },
        "items": {
          "type": "object",
          "$ref": "#/$defs/ArrayItem"
        }
      },
      "required": [
        "type",
        "contentType"
      ],
      "additionalProperties": false
    },
    "Property": {
      "oneOf": [
        {
          "$ref": "#/$defs/ValueProperty"
        },
        {
          "$ref": "#/$defs/RefProperty"
        }
      ]
    },
    "ValueProperty": {
      "type": "object",
      "properties": {
        "type": {
          "$ref": "#/$defs/XtpType"
        },
        "format": {
          "$ref": "#/$defs/XtpFormat"
        },
        "nullable": {
          "type": "boolean",
          "default": false
        },
        "description": {
          "type": "string"
        },
        "items": {
          "type": "object",
          "$ref": "#/$defs/ArrayItem"
        }
      },
      "required": [
        "type"
      ],
      "additionalProperties": false
    },
    "RefProperty": {
      "type": "object",
      "properties": {
        "$ref": {
          "$ref": "#/$defs/SchemaReference"
        },
        "description": {
          "type": "string"
        },
        "nullable": {
          "type": "boolean",
          "default": false
        }
      },
      "required": [
        "$ref"
      ],
      "additionalProperties": false
    },
    "ContentType": {
      "type": "string",
      "enum": [
        "application/json",
        "application/x-binary",
        "text/plain; charset=utf-8"
      ]
    },
    "XtpType": {
      "type": "string",
      "enum": [
        "integer",
        "string",
        "number",
        "boolean",
        "object",
        "array",
        "buffer"
      ]
    },
    "XtpFormat": {
      "type": "string",
      "enum": [
        "int32",
        "int64",
        "float",
        "double",
        "date-time",
        "byte"
      ]
    },
    "SchemaReference": {
      "type": "string",
      "pattern": "^#/components/schemas/[^/]+$"
    },
    "ArrayItem": {
      "type": "object",
      "oneOf": [
        {
          "$ref": "#/$defs/ValueArrayItem"
        },
        {
          "$ref": "#/$defs/RefArrayItem"
        }
      ]
    },
    "ValueArrayItem": {
      "type": "object",
      "properties": {
        "type": {
          "$ref": "#/$defs/XtpType"
        },
        "format": {
          "$ref": "#/$defs/XtpFormat"
        }
      },
      "required": [
        "type"
      ],
      "additionalProperties": false
    },
    "RefArrayItem": {
      "type": "object",
      "properties": {
        "$ref": {
          "$ref": "#/$defs/SchemaReference"
        }
      },
      "required": [
        "$ref"
      ],
      "additionalProperties": false
    }
  }
}
`

/**
 * This function validates a string input and returns a ValidationResult object.
 *
 * @returns {ValidationResult} Validation Result
 */
export function validateImpl(input: string): ValidationResult {
  const yaml = YAML.load(input);

  const ajv = new Ajv();
  const validate = ajv.compile(JSON.parse(jsonSchema));
  const valid = validate(yaml);

  if (!valid) {
    const errors: ValidationError[] = validate.errors!.map((error) => {
      return {
        message: error.message!,
        location: error.instancePath,
        schemaPath: error.schemaPath,
      };
    });

    return {
      valid: false,
      errors,
    };
  }

  return {
    valid: true,
    errors: [],
  };
}
