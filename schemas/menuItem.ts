import { defineField, defineType } from "sanity";

export default defineType({
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Breakfast", value: "Breakfast" },
          { title: "Lunch", value: "Lunch" },
          { title: "Drinks", value: "Drinks" },
        ],
      },
    }),
  ],
});
