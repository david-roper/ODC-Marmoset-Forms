/* eslint-disable perfectionist/sort-objects */

const { defineInstrument } = await import('/runtime/v1/@opendatacapture/runtime-core/index.js');
const { z } = await import('/runtime/v1/zod@3.23.x/index.js');


export default defineInstrument({
  kind: 'FORM',
  language: 'en',
  tags: ['Activity tracking', 'Actiwatch', 'Motion tracking'],
  internal: {
    edition: 1,
    name: 'MARMOSET_ACTIWATCH_FORM'
  },
  content: {
    actiwatchId: {
      kind: "string",
      variant: "input",
      label: "Actiwatch reference number"
    },
    roomNumber: {
      kind: "string",
      variant: "input",
      label: "Room number"
    },
    epochDuration: {
      kind: "number",
      variant: "input",
      label: "Duration of each epoch (seconds)"
    },
    wasMultipleDaySession: {
      kind: "boolean",
      variant: "radio",
      label: "Did the session span multiple days"
    },
    sessionStartDate: {
      kind: 'dynamic',
      deps: ['wasMultipleDaySession'],
      render(data) {
        if(data.wasMultipleDaySession) {
          return {
            kind: 'date',
            label: "Please enter the date the session started"
          }
        }
      }
    },
    wasSleepTracked: {
      kind: "boolean",
      variant: "radio",
      label: "Did the marmoset sleep during the session"
    },
    additionalComments: {
      kind: "string",
      variant: "textarea",
      label: "Additional Comments"
    }
  },
  details: {
    description: 'This form is used to track the status of a completed actiwatch session.',
    license: 'Apache-2.0',
    title: 'Actiwatch Form'
  },
  clientDetails: {
    estimatedDuration: 1,
    instructions: ['When filling out the form please keep track of the actiwatch used for the session, the time measurements used and duration of the session.']
  },
  measures: {
    additionalComments: {
      kind: 'const',
      visibility: "visible",
      ref: 'additionalComments'
    }
  },
  validationSchema: z.object({
    actiwatchId: z.string(),
    roomNumber: z.string(),
    epochDuration: z.number().min(0),
    wasMultipleDaySession: z.boolean(),
    sessionStartDate: z.date().optional(),
    wasSleepTracked: z.boolean(),
    additionalComments: z.string().optional()
  })
});