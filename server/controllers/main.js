"use strict";

module.exports = ({ strapi }) => ({
  find(ctx) {
    return strapi
      .plugin("strapi-tms")
      .service("mainService")
      .find(ctx.params.locale, ctx.params.namespace);
  },
  list() {
    return strapi.plugin("strapi-tms").service("mainService").list();
  },
  addKeyValuePairs(ctx) {
    const body = JSON.parse(ctx.request.body);

    return strapi
      .plugin("strapi-tms")
      .service("mainService")
      .addKeyValuesToNamespace(body.locale, body.namespace, body.keyValues);
  },
  modifyKeyValue(ctx) {
    const body = JSON.parse(ctx.request.body);

    return strapi
      .plugin("strapi-tms")
      .service("mainService")
      .addKeyValueToNamespace(
        body.key,
        body.text,
        body.locale,
        body.namespace,
        true
      );
  },
  createNamespace(ctx) {
    const body = JSON.parse(ctx.request.body);

    return strapi
      .plugin("strapi-tms")
      .service("mainService")
      .createNamespace(body.namespace, body.locales);
  },
  deleteLocaleNamespace(ctx) {
    const body = JSON.parse(ctx.request.body);

    return strapi
      .plugin("strapi-tms")
      .service("mainService")
      .deleteLocaleNamespace(body.namespace, body.locale);
  },
  deleteNamespace(ctx) {
    const body = JSON.parse(ctx.request.body);

    return strapi
      .plugin("strapi-tms")
      .service("mainService")
      .deleteNamespace(body.namespace);
  },
  deleteKeyValue(ctx) {
    const body = JSON.parse(ctx.request.body);

    return strapi
      .plugin("strapi-tms")
      .service("mainService")
      .deleteKeyValue(body.key, body.locale, body.namespace);
  },
});
