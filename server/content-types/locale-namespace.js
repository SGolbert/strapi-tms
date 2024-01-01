module.exports = {
  kind: "collectionType",
  collectionName: "locale_namespaces",
  info: {
    singularName: "locale-namespace",
    pluralName: "locale-namespaces",
    displayName: "locale-namespace",
  },
  options: {
    draftAndPublish: false,
    comment: "",
  },
  pluginOptions: {
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    name: {
      type: "string",
      required: true,
    },
    locale: {
      type: "string",
      required: true,
    },
    translations: {
      type: "json",
    },
  },
};
