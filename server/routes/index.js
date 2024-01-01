module.exports = [
  {
    method: "GET",
    path: "/:locale/:namespace",
    handler: "mainController.find",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/list",
    handler: "mainController.list",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/add-key-value",
    handler: "mainController.addKeyValue",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/modify-key-value",
    handler: "mainController.modifyKeyValue",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/create-namespace",
    handler: "mainController.createNamespace",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/delete-namespace",
    handler: "mainController.deleteNamespace",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/delete-locale-namespace",
    handler: "mainController.deleteLocaleNamespace",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/delete-key-value",
    handler: "mainController.deleteKeyValue",
    config: {
      policies: [],
      auth: false,
    },
  },
];
