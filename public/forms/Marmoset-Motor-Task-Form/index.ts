/* eslint-disable perfectionist/sort-objects */

const { defineInstrument } = await import('/runtime/v1/@opendatacapture/runtime-core/index.js');
const { z } = await import('/runtime/v1/zod@3.23.x/index.js');


type MotorTask =  "Wire hang" | "Pole test" | "String grab"

function createDependentField<const T>(field: T, fn: (motorTask?: MotorTask) => boolean) {
  return {
    kind: 'dynamic' as const,
    deps: ['motorTask'] as const,
    render: (data: { motorTask?: MotorTask }) => {
      if (fn(data.motorTask)) {
        return field;
      }
      return null;
    }
  };
}

export default defineInstrument({
  kind: 'FORM',
  language: 'en',
  tags: ['Rotarod', 'Motor tasks', 'Wire Hang', 'Pole test', 'String grab'],
  internal: {
    edition: 2,
    name: 'MARMOSET_MOTOR_TASK_FORM'
  },
  content: {
    roomNumber: {
      kind: "string",
      variant: "input",
      label: "Room number"
    },
    motorTask: {
      kind: "string",
      variant: "select",
      label: "Motor task",
      options: {
        "Wire hang": "Wire hang",
        "Pole test": "Pole test",
        "String grab": "String grab"
      }
    },
    wirehangStringGrabFailure: createDependentField({
      kind: "boolean",
      variant: "radio",
      label: "marmoset failed session"
    }, (type) => type === "String grab" || type === "Wire hang" ),
    
    wirehangDuration:createDependentField({
      kind: "number",
      variant: "input",
      label: "Longest duration before falling (seconds)"
    },(type) => type === "Wire hang"),

    wirehangPutbacks: createDependentField({
      kind: "number",
      variant: "input",
      label: "Times put back on wire"
    },(type) => type === "Wire hang"),

    poleTestDuration: createDependentField({
      kind: "number",
      variant: "input",
      label: "Pole test duration (seconds)"
    }, (type) => type === "Pole test"),

    poleTestResultLevel: createDependentField({
      kind: "string",
      variant: "select",
      label: "Pole test result",
      options: {
        "Pass": "Pass",
        "Marginal failure" :"Marginal failure",
        "Failure": "Failure"
      }
    }, (type) => type === "Pole test"),

    poleTestMarginalFailureReason: {
      kind: "dynamic",
      deps: ["poleTestResultLevel"],
      render(data) {
        if(data.poleTestResultLevel === "Marginal failure"){
          return {
            kind: "string",
            variant: "textarea",
            label: "Reason for marginal failure"

          }
        }
        return null
      }
    },
    additionalComments: {
      kind: "string",
      variant: "textarea",
      label: "Additional comments"
    }
  },
  clientDetails: {
    estimatedDuration: 1,
    instructions: ["To be filled in whenever a marmoset completes a motor task. It is expected that the motor task session as well as the tool used (Rotarod, Pole test, wire hang) is known."]
  },
  details: {
    description: 'Form to describe data gathered in a marmoset\'s motor task experiment',
    license: 'Apache-2.0',
    title: 'Marmoset Motor Task'
  },
  measures: {
    roomNumber: {
      kind: "const",
      visibility: "visible",
      ref: "roomNumber"
    },
    motorTask: {
      kind: "const",
      visibility: "visible",
      ref: "motorTask"
    },
    wirehangDuration: {
      kind: "const",
      visibility: "visible",
      ref: "wirehangDuration"
    },
    wirehangPutbacks: {
      kind: "const",
      visibility: "visible",
      ref: "wirehangPutbacks"
    },
    poleTestDuration: {
      kind: "const",
      visibility: "visible",
      ref: "poleTestDuration"
    },
    poleTestResultLevel: {
      kind: "const",
      visibility: "visible",
      ref: "poleTestResultLevel"
    },
    poleTestMarginalFailureReason: {
      kind: "const",
      visibility: "visible",
      ref: "poleTestMarginalFailureReason"
    },
    additionalComments: {
      kind: "const",
      visibility: "visible",
      ref: "additionalComments"
    }
  },
  validationSchema: z.object({
    roomNumber: z.string(),
    motorTask: z.enum([ "Wire hang" , "Pole test", "String grab"]),
    wirehangDuration: z.number().min(0).optional(),
    wirehangPutbacks: z.number().min(0).int().optional(),
    wirehangStringGrabFailure: z.boolean().optional(),
    poleTestDuration: z.number().min(0).optional(),
    poleTestResultLevel: z.enum(["Pass", "Marginal failure", "Failure"]).optional(),
    poleTestMarginalFailureReason: z.string().optional(),
    additionalComments: z.string().optional()
  })
});
