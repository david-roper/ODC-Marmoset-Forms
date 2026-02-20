/* eslint-disable perfectionist/sort-objects */

const { defineInstrument } = await import('/runtime/v1/@opendatacapture/runtime-core/index.js');
const { z } = await import('/runtime/v1/zod@3.23.x/index.js');

export default defineInstrument({
  kind: 'FORM',
  language: 'en',
  tags: ['Marmoset', 'Weight', 'Scale'],
  internal: {
    edition: 2,
    name: 'MARMOSET_WEIGHT_FORM'
  },
  content: {
    marmosetWeight: {
      kind: 'number',
      variant: 'input',
      label: 'Weight of marmoset (in grams)'
    },
    scaleKind: {
      kind: 'string',
      variant: 'select',
      label: "Kind of scale",
      options: {
        "Portable": "Small portable",
        "Regular": "Regular"
      }
    },
    additionalComments: {
      kind: "string",
      variant: "textarea",
      label: "Additional Comments"
    }
  },
  clientDetails: {
    estimatedDuration: 1,
    instructions: ['To be filled in whenever the animal is weighed. It is expected to know what type of scale is used (portable vs. non-portable) as well as its serial code. It is also assumed that proper weighing protocol is followed']
  },
  details: {
    description: 'A form to track data from whenever an animal is weighed.',
    license: 'Apache-2.0',
    title: 'Marmoset Weight Form'
  },
  measures: {
    marmosetWeight: {
      kind: 'const',
      label: 'marmoset weight',
      visibility: 'visible',
      ref: 'marmosetWeight'
    },
    scaleKind: {
      kind: "const",
      visibility: 'visible',
      ref: "scaleKind"
    },
    additionalComments: {
      kind: 'const',
      visibility: 'visible',
      ref: 'additionalComments'
    }

  },
  validationSchema: z.object({
    marmosetWeight: z.number().min(1).max(380),
    scaleKind: z.enum(["Portable","Regular"]),
    additionalComments: z.string().optional()
  })
});
