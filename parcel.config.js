// parcel.config.js
module.exports = {
  "extends": "@parcel/config-default",
  "reporters": ["..."],
  "resolvers": ["..."],
  "transformers": {
    "*.webmanifest": ["@parcel/transformer-webmanifest"]
  },
  
};
