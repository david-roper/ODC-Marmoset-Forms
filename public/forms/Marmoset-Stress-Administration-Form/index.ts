/* eslint-disable perfectionist/sort-objects */

const { defineInstrument } = await import('/runtime/v1/@opendatacapture/runtime-core/index.js');
import { z } from '/runtime/v1/zod@3.x';

type StressorType = "Electric foot shocks" | "Tail suspension" | "Restraint";


function createDependentField<const T>(field: T, fn: (stressorType?: StressorType) => boolean) {
  return {
    kind: 'dynamic' as const,
    deps: ['stressorType'] as const,
    render: (data: { stressorType?: StressorType }) => {
      if (fn(data.stressorType)) {
        return field;
      }
      return null;
    }
  };
}

export default defineInstrument({
  kind: 'FORM',
  language: 'en',
  tags: ['Stress', 'Tail suspension', 'Restraint', 'Electric shock', 'Marmoset'],
  internal: {
    edition: 2,
    name: 'STRESS_ADMINISTRATION_FORM'
  },
  content: {
    roomNumber: {
      kind: "string",
      variant: "input",
      label: "Room number"  
    },
    stressorType: {
      kind: "string",
      variant: "select",
      label: "Type of stressor",
      options: {
        "Electric foot shocks": "Electric foot shocks",
        "Tail suspension": "Tail suspension",
        "Restraint": "Restraint"
      }
    },

    footShocksNumber: createDependentField({
      kind: "number",
      variant: "input",
      label: "Number of foot shocks"
    }, (type) => type === "Electric foot shocks"),

    footShockAmperage: createDependentField({
      kind: "number",
      variant: "input",
      label: "Electric shock amperage (in milliamps)"
    },
    (type) => type === "Electric foot shocks"),
    
    tailSuspensionClimbStoppers: createDependentField({
      kind: "boolean",
      variant: "radio",
      label: "Climb stoppers used"
    },
    (type) => type === "Tail suspension"),

    additionalComments: {
      kind: "string",
      variant: "textarea",
      label: "Additional Comments"
    }
  },
  details: {
    description: 'Describes the stress administration done upon an animal, with the current possible three options being tail suspension, restraint and electric foot shocks.',
    license: 'Apache-2.0',
    title: 'Stress Administration Form'
  },
  clientDetails: {
    instructions: ['This is to be filled after a marmoset is finished a stress administration session, it is expected to know where the session took place.'],
    estimatedDuration: 2,
  },
  measures: {
    roomNumber: {
        kind: "const",
        visibility: "visible",
        ref: "roomNumber"
      },
      stressorType: {
        kind: "const",
        visibility: "visible",
        ref: "stressorType"
      },
      footShocksNumber: {
        kind: "const",
        visibility: "visible",
        ref: "footShocksNumber"
      },
      footShockAmperage: {
        kind: "const",
        visibility: "visible",
        ref: "footShockAmperage"
      },
      tailSuspensionClimbStoppers: {
        kind: "const",
        visibility: "visible",
        ref: "tailSuspensionClimbStoppers"
      },
      additionalComments: {
        kind: 'const',
        visibility: "visible",
        ref: 'additionalComments'
      }

  },
  validationSchema: z.object({
    roomNumber: z.string(),
    stressorType: z.enum(["Electric foot shocks", "Tail suspension", "Restraint"]),
    footShocksNumber: z.number().int().min(1).optional(),
    footShockAmperage: z.number().min(0).optional(),
    tailSuspensionClimbStoppers: z.boolean().optional(),
    additionalComments: z.string().optional()

  })
});
