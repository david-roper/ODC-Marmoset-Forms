/* eslint-disable perfectionist/sort-objects */

const { defineInstrument } = await import('/runtime/v1/@opendatacapture/runtime-core/index.js');
const { z } = await import('/runtime/v1/zod@3.23.x/index.js');

export default defineInstrument({
  kind: 'FORM',
  language: 'en',
  tags: ['Birth', 'Marmoset','Origin'],
  internal: {
    edition: 1,
    name: 'MARMOSET_ORIGIN_FORM'
  },
  content: {
    dateOfBirth: {
      kind: 'date',
      label: "date of birth"
    },
    marmosetSex: {
      kind: 'string',
      variant: 'radio',
      label: 'Sex',
      options: {
        "Male": "Male",
        "Female": "Female"
      }
    },
    cohortId: {
      kind: 'string',
      variant: 'input',
      label: 'Cohort Identification (Optional)'
    },
    marmosetStrain: {
      kind: "string",
      variant: "select",
      label: "Marmoset Strain",
      options: {
        "Pygmy": "Pygmy",
        "Atlantic Forest": "Atlantic Forest",
        "Other":"Other"
      }
    },
    otherStrain: {
      kind: "dynamic",
      deps: ["marmosetStrain"],
      render(data) {
        if(data.marmosetStrain === "Other"){
           return {
            kind : "string",
            variant: "input",
            label: "Other strain"
           }
        }
        return null
      }
    },
    marmosetGenotype: {
      kind: "string",
      variant: "select",
      label: "Marmoset Genotype",
      options: {
        "Hemizygous": "Hemizygous",
        "Homozygous": "Homozygous",
        "Heterozygous": "Heterozygous",
        "Wild-type": "Wild-type",
        "Other": "Other"
      }
    },
    marmosetGenotypeOther: {
      kind: "dynamic",
      deps: ["marmosetGenotype"],
      render(data) {
        if(data.marmosetGenotype === "Other"){
           return {
            kind : "string",
            variant: "input",
            label: "Other Genotype"
           }
        }
        return null
      }
    },
    externalBreederMarmoset: {
      kind: 'boolean',
      variant: 'radio',
      label: 'Originates from external breeder (bought/imported marmoset)?'
    },
    orderId: {
      kind: 'dynamic',
      deps: ['externalBreederMarmoset'],
      render(data) {
        if (data.externalBreederMarmoset){
          return {
            kind: 'string',
            variant: 'input',
            label: 'Order ID'
          }
        }
        return null
      }
    },
    breederOrigin: {
      kind: 'dynamic',
      deps: ['externalBreederMarmoset'],
      render(data) {
        if (data.externalBreederMarmoset){
          return {
            kind: 'string',
            variant: 'select',
            label: "Origin of breeder",
            options: {
              "Charles River Laboratories": "Charles River Laboratories",
              "Envigo": "Envigo",
              "Import": "Import",
              "Jackson Laboratories": "Jackson Laboratories",
              "Western University": "Western University",
              "Other": "Other"
            }
          }
        }
        return null
      }
    },
    otherBreederOrigin: {
      kind: 'dynamic',
      deps: ["breederOrigin"],
      render(data) {
        if(data.breederOrigin === "Other"){
          return {
            kind: "string",
            variant: "input",
            label: "Other external breeder"
          }
        }
        return null
      }
    },
    breedingCageId: {
      kind: 'dynamic',
      deps: ['externalBreederMarmoset'],
      render(data) {
       if(data.externalBreederMarmoset === false){
         return {
         kind: 'string',
         variant: 'input',
         label: "Breeding Cage ID"
         }
       }
       return null
      }
    },
    motherKnown: {
      kind: 'boolean',
      variant: 'radio',
      label: "Is the mother known?"
    },
    motherMarmosetId: {
      kind: 'dynamic',
      deps: ['motherKnown'],
      render(data) {
       if(data.motherKnown){
         return {
          kind: "string",
          variant: "input",
          label: "Id of marmoset's mother (optional)"
         }
       }
       return null
      }
    },
    motherMarmosetStrain: {
      kind: 'dynamic',
      deps: ['motherKnown'],
      render(data) {
        if(data.motherKnown){
          return {
            kind: 'string',
            variant: 'select',
            label: 'Mother marmoset strain (optional)',
            options: {
               "Pygmy": "Pygmy",
               "Atlantic Forest": "Atlantic Forest",
               "Other":"Other"
            }
          }
        }
        return null
      }
    },
    motherMarmosetOtherStrain: {
      kind: "dynamic",
      deps: ["motherMarmosetStrain"],
      render(data) {
        if(data.motherMarmosetStrain === "Other"){
           return {
            kind : "string",
            variant: "input",
            label: "Mother other strain"
           }
        }
        return null
      }
    },

    motherMarmosetGenotype: {
      kind: 'dynamic',
      deps: ['motherKnown'],
      render(data) {
        if(data.motherKnown){
          return {
            kind: "string",
            variant: "select",
            label: "Mother marmoset Genotype (optional)",
            options: {
              "Hemizygous": "Hemizygous",
              "Homozygous": "Homozygous",
              "Heterozygous": "Heterozygous",
              "Wild-type": "Wild-type",
              "Other": "Other"
            }
          }
        }
        return null
      }
    },
    motherMarmosetGenotypeOther: {
      kind: "dynamic",
      deps: ["motherMarmosetGenotype"],
      render(data) {
        if(data.motherMarmosetGenotype === "Other"){
           return {
            kind : "string",
            variant: "input",
            label: "Other Genotype"
           }
        }
        return null
      }
    },
    fatherKnown: {
      kind: 'boolean',
      variant: 'radio',
      label: "Is the father known?"
    },
    fatherMarmosetId: {
     kind: 'dynamic',
     deps: ['fatherKnown'],
     render(data) {
      if(data.fatherKnown){
        return {
          kind: 'string',
          variant: 'input',
          label: "Id of marmoset's father (optional)"
        }
      }
      return null
     }
    },
    fatherMarmosetStrain: {
      kind: 'dynamic',
      deps: ['fatherKnown'],
      render(data) {
        if(data.fatherKnown){
          return {
            kind: 'string',
            variant: 'select',
            label: 'Father marmoset strain (optional)',
            options: {
              "Pygmy": "Pygmy",
              "Atlantic Forest": "Atlantic Forest",
              "Other":"Other"
            }
          }
        }
        return null
      }
    },
    fatherMarmosetOtherStrain: {
      kind: "dynamic",
      deps: ["fatherMarmosetStrain"],
      render(data) {
        if(data.fatherMarmosetStrain === "Other"){
           return {
            kind : "string",
            variant: "input",
            label: "Father other strain"
           }
        }
        return null
      }
    },

    fatherMarmosetGenotype: {
      kind: 'dynamic',
      deps: ['fatherKnown'],
      render(data) {
        if(data.fatherKnown){
          return {
            kind: "string",
            variant: "select",
            label: "Father marmoset genotype (optional)",
            options: {
              "Hemizygous": "Hemizygous",
              "Homozygous": "Homozygous",
              "Heterozygous": "Heterozygous",
              "Wild-type": "Wild-type",
              "Other": "Other"
            }
          }
        }
        return null
      }
    },
    fatherMarmosetGenotypeOther: {
      kind: "dynamic",
      deps: ["fatherMarmosetGenotype"],
      render(data) {
        if(data.fatherMarmosetGenotype === "Other"){
           return {
            kind : "string",
            variant: "input",
            label: "Father other Genotype"
           }
        }
        return null
      }
    },

    roomNumber: {
      kind: 'dynamic',
      deps: ['externalBreederMarmoset'],
      render(data){
        if(data.externalBreederMarmoset === false){
          return {
            kind: "string",
            variant: "input",
            label: "Room number marmoset was bred in"
          }
        }
        return null
      }
    },
    generationNumber: {
      kind: 'number',
      variant: 'input',
      label: 'N-generation of marmoset (optional)'
    },
    additionalComments: {
      kind: "string",
      variant: "textarea",
      label: "Additional Comments"
    }
  },
  clientDetails: {
    estimatedDuration: 1,
    instructions: ['Whenever a new marmoset is born within the lab, or is exported from an external breeder this form should be filled in to log its information. If the marmoset is from an external breeder, information of the breeder as well as the box the marmoset came in is expected to be known.']
  },
  details: {
    description: 'Tracks a marmoset\'s birth information, whether it was born within the lab or an exported marmoset from an external breeder',
    license: 'Apache-2.0',
    title: 'Marmoset Origin Form'
  },
  measures: {
   dateOfBirth: {
    kind: 'const',
    label: 'Date of birth',
    visibility: 'visible',
    ref: 'dateOfBirth'
  },
  marmosetSex: {
    kind: 'const',
    label: 'Sex',
    visibility: 'visible',
    ref: 'marmosetSex'
  },
  cohortId: {
    kind: 'const',
    label: 'Cohort',
    visibility: 'visible',
    ref: 'cohortId'
  },
  marmosetStrain: {
    kind: 'const',
    label: 'Marmoset Strain',
    visibility: 'visible',
    ref: 'marmosetStrain'
  },
  otherStrain: {
    kind: 'const',
    visibility: 'visible',
    ref: 'otherStrain'
  },
  marmosetGenotype: {
    kind: 'const',
    label: 'Marmoset Genotype',
    visibility: 'visible',
    ref: 'marmosetGenotype'
  },
  marmosetGenotypeOther: {
    kind: 'const',
    visibility: 'visible',
    ref: 'marmosetGenotypeOther'
  },
  externalBreederMarmoset: {
    kind: 'const',
    label: 'Originates from external breeder',
    visibility: 'visible',
    ref: "externalBreederMarmoset"
  },
  orderId: {
    kind: 'const',
    visibility: 'visible',
    ref: 'orderId'
  },
  breederOrigin: {
    kind: 'const',
    visibility: 'visible',
    ref: 'breederOrigin'
  },
  otherBreederOrigin: {
    kind: 'const',
    visibility: 'visible',
    ref: 'otherBreederOrigin'
  },
  breedingCageId: {
    kind: "const",
    visibility: 'visible',
    ref: 'breedingCageId'
  },
  motherKnown: {
    kind: 'const',
    visibility: 'visible',
    label: 'Is mother known',
    ref: 'motherKnown'
  },
  motherMarmosetId: {
    kind: 'const',
    visibility: 'visible',
    ref: 'motherMarmosetId'
  },
  motherMarmosetStrain: {
    kind: 'const',
    visibility: 'visible',
    ref: 'motherMarmosetStrain'
  },
  motherMarmosetOtherStrain: {
    kind: 'const',
    visibility: 'visible',
    ref: 'motherMarmosetOtherStrain'
  },
  motherMarmosetGenotype: {
    kind: 'const',
    visibility: 'visible',
    ref: 'motherMarmosetGenotype'
  },
  motherMarmosetGenotypeOther: {
    kind: 'const',
    visibility: 'visible',
    ref: 'motherMarmosetGenotypeOther'
  },
  fatherKnown: {
    kind: 'const',
    visibility: 'visible',
    label: 'Is father known',
    ref: 'fatherKnown'
  },
  fatherMarmosetId: {
    kind: 'const',
    visibility: 'visible',
    ref: 'fatherMarmosetId'
  },
  fatherMarmosetStrain: {
    kind: 'const',
    visibility: 'visible',
    ref: 'fatherMarmosetStrain'
  },
  fatherMarmosetOtherStrain: {
    kind: 'const',
    visibility: 'visible',
    ref: 'fatherMarmosetOtherStrain'
  },
  fatherMarmosetGenotype: {
    kind: 'const',
    visibility: 'visible',
    ref: 'fatherMarmosetGenotype'
  },
  fatherMarmosetGenotypeOther: {
    kind: 'const',
    visibility: 'visible',
    ref: 'fatherMarmosetGenotypeOther'
  },
  roomNumber: {
    kind: "const",
    visibility: 'visible',
    ref: "roomNumber"
  },
  generationNumber: {
    kind: 'const',
    visibility: 'visible',
    ref: 'generationNumber'
  },
  additionalComments: {
    kind: 'const',
    visibility: 'visible',
    ref: 'additionalComments'
  }
  },
  validationSchema: z.object({
  dateOfBirth: z.date(),
  marmosetSex: z.enum(['Male', 'Female']),
  cohortId: z.string().optional(),
  externalBreederMarmoset: z.boolean(),
  marmosetStrain: z.enum([
      "Pygmy",
    "Atlantic Forest",
    'Other'
  ]),
  otherStrain: z.string().optional(),
  marmosetGenotype: z.enum([
    'Homozygous',
    'Hemizygous',
    'Heterozygous',
    'Wild-type',
    'Other'
  ]),
  marmosetGenotypeOther: z.string().optional(),
  orderId: z.string().optional(),
  breedingCageId: z.string().optional(),
  motherKnown: z.boolean(),
  motherMarmosetId: z.string().optional(),
  motherMarmosetStrain: z.enum([
    "Pygmy",
    "Atlantic Forest",
    'Other'
  ]).optional(),
  motherMarmosetOtherStrain: z.string().optional(),
  motherMarmosetGenotype: z.enum([
    'Homozygous',
    'Hemizygous',
    'Heterozygous',
    'Wild-type',
    'Other'
  ]).optional(),
  motherMarmosetGenotypeOther: z.string().optional(),
  fatherKnown: z.boolean(),
  fatherMarmosetId: z.string().optional(),
  fatherMarmosetStrain: z.enum([
    "Pygmy",
    "Atlantic Forest",
    'Other'
  ]).optional(),
  fatherMarmosetOtherStrain: z.string().optional(),
  fatherMarmosetGenotype: z.enum([
    'Homozygous',
    'Hemizygous',
    'Heterozygous',
    'Wild-type',
    'Other'
  ]).optional(),
  fatherMarmosetGenotypeOther: z.string().optional(),
  breederOrigin: z.enum([
    'Charles River Laboratories',
    'Envigo',
    'Import',
    'Jackson Laboratories',
    'Western University',
    'Other'
  ]).optional(),
  otherBreederOrigin: z.string().optional(),
  roomNumber: z.string().optional(),
  generationNumber: z.number().min(0).int().optional(),
  additionalComments: z.string().optional()
})
});