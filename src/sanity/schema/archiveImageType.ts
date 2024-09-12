import { defineField, defineType } from "sanity";

export const archiveImageType = defineType({
  name: "archiveImages",
  title: "Archive Images",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
