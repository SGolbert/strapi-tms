const utils = require("@strapi/utils");
const { cleanTranslationObject } = require("../utils");
const _get = require("lodash/get");
const _set = require("lodash/set");

const { ApplicationError } = utils.errors;

module.exports = ({ strapi }) => ({
  async find(locale, namespace) {
    const data = await strapi.entityService.findMany(
      "plugin::strapi-tms.locale-namespace"
    );
    const result = data.find(
      (entry) => entry.locale === locale && entry.name === namespace
    );

    if (!result) {
      throw new ApplicationError("locale-namespace not found", {
        locale,
        namespace,
      });
    }

    return result.translations;
  },
  /**
   * Creates namespace with the given locales
   *
   * @param {string} namespace
   * @param {string[]} locales
   */
  async createNamespace(namespace, locales) {
    const data = await strapi.entityService.findMany(
      "plugin::strapi-tms.locale-namespace"
    );
    const localesToCreate = locales.filter((locale) => {
      return (
        data.find(
          (entry) => entry.locale === locale && entry.name === namespace
        ) === undefined
      );
    });

    if (localesToCreate.length === 0) {
      throw new ApplicationError("locale-namespaces already exists", {
        locales,
        namespace,
      });
    }

    localesToCreate.forEach((locale) => {
      strapi.entityService.create("plugin::strapi-tms.locale-namespace", {
        data: {
          name: namespace,
          locale,
          translations: {},
        },
      });
    });

    console.log(localesToCreate);

    return localesToCreate;
  },
  /**
   * The `deleteNamespace` function deletes a namespace from a collection of entities in the Strapi
   * CMS.
   * @param {string} namespace - The `namespace` parameter is a string that represents the name of the namespace
   * to be deleted.
   */
  async deleteNamespace(namespace) {
    const data = await strapi.entityService.findMany(
      "plugin::strapi-tms.locale-namespace"
    );
    const results = data.filter((entry) => entry.name === namespace);

    if (results.length === 0) {
      throw new ApplicationError("namespace not found", {
        namespace,
      });
    }

    results.forEach((localeNamespace) => {
      strapi.entityService.delete(
        "plugin::strapi-tms.locale-namespace",
        localeNamespace.id
      );
    });

    return {};
  },
  /**
   * The `deleteLocaleNamespace` function is used to delete a specific namespace and locale from the
  `locale-namespace` collection.
   *
   * @param {string} namespace
   * @param {string} locale
   */
  async deleteLocaleNamespace(namespace, locale) {
    const data = await strapi.entityService.findMany(
      "plugin::strapi-tms.locale-namespace"
    );
    const result = data.find(
      (entry) => entry.locale === locale && entry.name === namespace
    );

    if (!result) {
      throw new ApplicationError("locale-namespace not found", {
        locale,
        namespace,
      });
    }

    strapi.entityService.delete(
      "plugin::strapi-tms.locale-namespace",
      result.id
    );

    return {};
  },
  /**
   * The `addKeyValueToNamespace` function is used to add a key-value pair to a specific namespace and
   * locale in the `locale-namespace` collection.
   * @param {string} key
   * @param {string} text
   * @param {string} locale
   * @param {string} namespace
   */
  async addKeyValueToNamespace(
    key,
    text,
    locale,
    namespace,
    isModifiedAllowed = false
  ) {
    const data = await strapi.entityService.findMany(
      "plugin::strapi-tms.locale-namespace"
    );
    const result = data.find(
      (entry) => entry.locale === locale && entry.name === namespace
    );

    if (!result) {
      throw new ApplicationError("locale-namespace not found", {
        locale,
        namespace,
      });
    }

    const alreadyExists = _get(result.translations, key) !== undefined;

    if (alreadyExists && !isModifiedAllowed) {
      throw new ApplicationError("Key already present in locale-namespace", {
        key,
        locale,
        namespace,
      });
    }

    if (!alreadyExists && isModifiedAllowed) {
      throw new ApplicationError(
        "Key not present in locale-namespace. Use add endpoint instead",
        {
          key,
          locale,
          namespace,
        }
      );
    }

    const modifiedTranslations = _set(result.translations, key, text);

    await strapi.entityService.update(
      "plugin::strapi-tms.locale-namespace",
      result.id,
      {
        data: {
          translations: modifiedTranslations,
        },
      }
    );

    return {};
  },
  /**  The `deleteKeyValue` function is used to delete a key-value pair from a specific namespace and
   * locale in the `locale-namespace` collection.
   * @param {string} key
   * @param {string} locale
   * @param {string} namespace
   */
  async deleteKeyValue(key, locale, namespace) {
    const data = await strapi.entityService.findMany(
      "plugin::strapi-tms.locale-namespace"
    );
    const result = data.find(
      (entry) => entry.locale === locale && entry.name === namespace
    );

    if (!result) {
      throw new ApplicationError("locale-namespace not found", {
        locale,
        namespace,
      });
    }

    const alreadyExists = _get(result.translations, key) !== undefined;

    if (!alreadyExists) {
      throw new ApplicationError("Key not present in locale-namespace", {
        key,
        locale,
        namespace,
      });
    }

    const modifiedTranslations = _set(result.translations, key, undefined);

    cleanTranslationObject(modifiedTranslations);

    await strapi.entityService.update(
      "plugin::strapi-tms.locale-namespace",
      result.id,
      {
        data: {
          translations: modifiedTranslations,
        },
      }
    );

    return {};
  },
  async list() {
    const data = await strapi.entityService.findMany(
      "plugin::strapi-tms.locale-namespace"
    );

    return data.reduce((acc, entry) => {
      if (!acc[entry.name]) {
        return { ...acc, [entry.name]: [entry.locale] };
      } else {
        return { ...acc, [entry.name]: [...acc[entry.name], entry.locale] };
      }
    }, {});
  },
});
