/* eslint-disable perfectionist/sort-objects */

const { defineInstrument } = await import('/runtime/v1/@opendatacapture/runtime-core/index.js');
const { z } = await import('/runtime/v1/zod@3.23.x/index.js');

export default defineInstrument({
  kind: 'FORM',
  language: 'en',
  tags: ['Marmoset', 'MRI Habituation', 'Sound', 'Preyer reflex'],
  internal: {
    edition: 1,
    name: 'MRI_HABITUATION_FORM'
  },
  defaultMeasureVisibility: 'visible',
  content: {
    roomNumber: {
        kind: "string",
        variant: "input",
        label: "Room number"
    },
    chamberNumber: {
      kind: "string",
      variant: "input",
      label: "Chamber number"
    },
    duration: {
      kind: "number",
      variant: "input",
      label: "Duration of session in minutes"
    },
    audioType: {
      kind: "string",
      variant: "input",
      label: "Audio type used (sequence)"
    },
    restraintUsed: {
      kind: "boolean",
      variant: "radio",
      label: "Restraint or holder used"
    },
    sessionType: {
      kind: "string",
      variant: "select",
      label: "Session type",
      options: {
        "Head-fixed": "Head-fixed",
        "Not head-fixed": "Not head-fixed",
        "Training": "Training"
      }
    },
    headPostInstalled: {
      kind: "boolean",
      variant: "radio",
      label: "Headpost installed"
    },
    preyerReflexTestSuccessful: {
      kind: "boolean",
      variant: "radio",
      label: "Animal passes the preyer reflex test"
    },
    additionalComments: {
      kind: "string",
      variant: "textarea",
      label: "Additional Comments"
    }
  },
  clientDetails: {
    estimatedDuration: 1,
    instructions: ["To be filled in whenever and animal completes a MRI habituation session. On must track information on the location of the session, tracking dropping done by the animal, and room position. The preyer's reflex test must also be completed on the animal before completion of the form."]
  },
  details: {
    description: 'A form to track data from whenever an animal goes through an MRI Habituation session',
    license: 'Apache-2.0',
    title: 'MRI Habituation Form'
  },
  measures: {
    roomNumber: {
      kind: 'const',
      ref: "roomNumber"
    },
    chamberNumber: {
      kind: 'const',
      ref: "chamberNumber"
    },
    duration: {
      kind: 'const',
      ref: "duration"
    },
    audioType: {
      kind: 'const',
      ref: "audioType"
    },
    restraintUsed: {
      kind: 'const',
      ref: "restraintUsed"
    },
    sessionType: {
      kind: 'const',
      ref: "sessionType"
    },
    headPostInstalled: {
      kind: 'const',
      ref: "headPostInstalled"
    },
    preyerReflexTestSuccessful: {
      kind: "const",
      ref: "preyerReflexTestSuccessful"
    },
    additionalComments: {
      kind: 'const',
      ref: 'additionalComments'
    }
  },
  validationSchema: z.object({
    roomNumber: z.string(),
    chamberNumber: z.string(),
    duration: z.number().min(0),
    restraintUsed: z.boolean(),
    headPostInstalled: z.boolean(),
    audioType: z.string(),
    sessionType: z.enum(["Head-fixed", "Not head-fixed", "Training"]),
    preyerReflexTestSuccessful: z.boolean(),
    additionalComments: z.string().optional()
  })
});
