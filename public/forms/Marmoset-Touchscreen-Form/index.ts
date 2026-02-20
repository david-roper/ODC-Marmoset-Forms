/* eslint-disable perfectionist/sort-objects */

const { defineInstrument } = await import(
  "/runtime/v1/@opendatacapture/runtime-core/index.js"
);
const { z } = await import("/runtime/v1/zod@3.23.x/index.js");

export default defineInstrument({
  kind: "FORM",
  language: "en",
  tags: ["Marmoset", "Touchscreen", "PVD", "5-choice"],
  internal: {
    edition: 1,
    name: "MARMOSET_TOUCHSCREEN_FORM",
  },
  content: {
    experimentType: {
      kind: "string",
      variant: "radio",
      label: "Type of touchscreen session",
      options: {
        "PVD": "PVD (Pairwise Discrimination)",
        "5-choice": "5CSRTT (5 choice serial reaction time task)",
      },
    },
    experimentStage: {
      kind: "string",
      variant: "select",
      label: "Experiment stage",
      options: {
        habituation: "Habituation",
        habituation2a: "Habituation2a",
        habituation2b: "Habituation2b",
        "initial touch": "Initial touch",
        "must touch": "Must touch",
        "must initiate": "Must initiate",
        "punish incorrect": "Punish incorrect",
        "full session": "Full session",
      },
    },
    pvdStage: {
      kind: "dynamic",
      deps: ["experimentType", "experimentStage"],
      render(data) {
        if (
          data.experimentType === "PVD" &&
          data.experimentStage === "full session"
        ) {
          return {
            kind: "string",
            variant: "radio",
            label: "PVD experiment stage",
            options: {
              acquisition: "Acquisition",
              reversal: "Reversal",
              "re-reversal": "Re-reversal",
            },
          };
        }
        return null;
      },
    },
    fiveChoiceStage: {
      kind: "dynamic",
      deps: ["experimentType", "experimentStage"],
      render(data) {
        if (
          data.experimentType === "5-choice" &&
          data.experimentStage === "full session"
        ) {
          return {
            kind: "string",
            variant: "radio",
            label: "5-choice experiment stage",
            options: {
              "4 second stimulus": "4 second stimulus",
              "2 second stimulus": "2 second stimulus",
              "Pro trial": "Pro trial",
            },
          };
        }
        return null;
      },
    },
    chamberNumber: {
      kind: "number",
      variant: "input",
      label: "Chamber number",
    },
    chamberSerialCode: {
      kind: "string",
      variant: "input",
      label: "Chamber serial code",
    },
    rewardUsed: {
      kind: "string",
      variant: "select",
      label: "Reward used",
      options: {
        "Marshmallow": "Marshmallow",
        "Sugar": "Sugar",
        "Mealworm": "Mealworm",
        "Yogurt chips": "Yogurt chips",
        "Other": "Other"
      }
    },
    rewardOther: {
      kind:"dynamic",
      deps: ["rewardUsed"],
      render(data) {
        if(data.rewardUsed === "Other"){
          return {
            kind: "string",
            variant: "input",
            label: "Other form of reward"
          }
        }
        return null
      }
    },
    foodGiven: {
      kind: "number",
      variant: "input",
      label: "Amount of food given (in grams)",
    },
    trialFailed: {
      kind: "boolean",
      variant: "radio",
      label: "Did the marmoset fail the session?",
    },
    failureReason: {
      kind: "dynamic",
      deps: ["trialFailed"],
      render(data) {
        if (data.trialFailed) {
          return {
            kind: "string",
            variant: "textarea",
            label: "Reason for failure",
          };
        }
        return null;
      },
    },
    motivationTask: {
      kind: "string",
      variant: "textarea",
      label: "If any other tasks/activities were done to motivate the marmoset, please describe them below"
    },
    additionalComments: {
      kind: "string",
      variant: "textarea",
      label: "Additional Comments",
    },
  },
  clientDetails: {
    estimatedDuration: 2,
    instructions: [
       "Please answer the form's questions as accurately as possible, this form is meant to be filled in per Marmoset used"
    ],
  },
  details: {
    description:
      "This is a form to collect data from a Marmoset's touchscreen session",
    license: "Apache-2.0",
    title: "Marmoset Touchscreen form",
  },
  measures: {
    experimentType: {
      kind: "const",
      label: "Touchscreen session type",
      visibility: "visible",
      ref: "experimentType",
    },
    experimentStage: {
      kind: "const",
      label: "Touchscreen session stage",
      visibility: "visible",
      ref: "experimentStage",
    },
    pvdStage: {
      kind: "const",
      label: "PVD session stage",
      visibility: "visible",
      ref: "pvdStage",
    },
    fiveChoiceStage: {
      kind: "const",
      label: "5-choice session stage",
      visibility: "visible",
      ref: "fiveChoiceStage",
    },
    chamberNumber: {
      kind: "const",
      label: "Chamber number",
      visibility: "visible",
      ref: "chamberNumber",
    },
    chamberSerialCode: {
      kind: "const",
      label: "Chamber serial code",
      visibility: "visible",
      ref: "chamberSerialCode",
    },
    foodGiven: {
      kind: "const",
      label: "Food given",
      visibility: "visible",
      ref: "foodGiven",
    },
    trialFailed: {
      kind: "const",
      label: "Trial failed",
      visibility: "visible",
      ref: "trialFailed",
    },
    failureReason: {
      kind: "const",
      label: "Reason for failure",
      visibility: "visible",
      ref: "failureReason",
    },
    additionalComments: {
      kind: "const",
      label: "Additional Comments",
      visibility: "visible",
      ref: "additionalComments",
    },
  },
  validationSchema: z.object({
    experimentType: z.enum(["PVD", "5-choice"]),
    experimentStage: z.enum([
      "habituation",
      "habituation2a",
      "habituation2b",
      "initial touch",
      "must touch",
      "must initiate",
      "punish incorrect",
      "full session",
    ]),
    pvdStage: z.enum(["acquisition", "reversal", "re-reversal"]).optional(),
    fiveChoiceStage: z
      .enum(["4 second stimulus", "2 second stimulus", "Pro trial"])
      .optional(),
    chamberNumber: z.number().min(0),
    chamberSerialCode: z.string(),
    rewardUsed: z.enum(["Marshmallow", "Sugar", "Mealworm","Yogurt chips", "Other"]),
    rewardOther: z.string().optional(),
    foodGiven: z.number().min(0).max(100),
    trialFailed: z.boolean(),
    failureReason: z.string().optional(),
    motivationTask: z.string().optional(),
    additionalComments: z.string().optional(),
  }),
});
