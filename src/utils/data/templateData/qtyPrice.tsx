const qtyPrice = {
  product: [
    "Parent Seller SKU",
    "Seller SKU",
    "Sale Price",
    "Price",
    "Quantity",
    "Listing Status",
  ],
  Instructions: [
    {
      FieldDisplayName: "Parent Seller SKU",
      DataType: "String",
      Importance: "Required",
      AllowedValues: null,
      Description: "SKU value fo the parent product",
    },
    {
      FieldDisplayName: "Seller SKU",
      DataType: "String",
      Importance: "Required",
      AllowedValues: null,
      Description:
        "SKU value of the variation (child) product (If there is no variation of the main product, then Parent Seller SKU and Seller SKU is same)",
    },
    {
      FieldDisplayName: "Sale Price",
      DataType: "Numeric",
      Importance: "Optional",
      AllowedValues: null,
      Description:
        "The price of the product when it is on sale or when a discount is provided. Must be the same or less than price.",
    },

    {
      FieldDisplayName: "Price",
      DataType: "Numeric",
      Importance: "Required",
      AllowedValues: null,
      Description: "The price to list for the product.",
    },
    {
      FieldDisplayName: "Quantity",
      DataType: "Numeric",
      Importance: "Required",
      AllowedValues: null,
      Description: "The available quantity of the product",
    },
    {
      FieldDisplayName: "Listing Status",
      DataType: "String",
      Importance: "Required",
      AllowedValues: null,
      Description: "Write 'live' if quantity is not 0 else write 'not live'",
    },
  ],
  Example: [
    {
      "Parent Seller SKU": "PSKU1",
      "Seller SKU": "SKU1_1",
      "Sale Price": "500",
      Price: "89",
      Quantity: "900",
      "Listing Status": "live",
    },
    {
      "Parent Seller SKU": "PSKU1",
      "Seller SKU": "SKU1_1",
      "Sale Price": "200",
      Price: "229",
      Quantity: "200",
      "Listing Status": "live",
    },
  ],
};

export default qtyPrice;
