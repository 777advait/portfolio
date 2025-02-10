import type { Affiliations } from "@/lib/definitions";
import { defineType, type ValidationContext } from "sanity";

export const affiliationsType = defineType({
  name: "affiliations",
  title: "Affiliations",
  type: "document",
  fields: [
    {
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "company",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "position",
      title: "Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
      options: {
        dateFormat: "MM-YYYY",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "currentlyWorking",
      title: "Currently Working Here",
      type: "boolean",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
      options: {
        dateFormat: "MM-YYYY",
      },
      validation: (Rule) =>
        Rule.custom((endDate, context: ValidationContext) => {
          const doc = context.parent as Affiliations;

          if (doc.currentlyWorking) {
            return true;
          }

          if (!endDate) {
            return "End date is required when not currently working";
          }

          return endDate >= doc.startDate
            ? true
            : "End date must be after start date";
        }),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
});
