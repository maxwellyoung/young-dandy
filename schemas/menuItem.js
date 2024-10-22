const menuItem = {
  name: "menuItem",
  title: "Menu Item",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "string",
    },
    {
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
    },
  ],
};

export default menuItem;
