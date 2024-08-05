/**
 * Options for the ExcludeSensitiveFields decorator.
 */
interface ExcludeSensitiveFieldsOptions {
  fields?: string[];
  overrideDefaultList?: boolean;
  applyOnNested?: boolean;
}

/**
 * A decorator that excludes specified sensitive fields from the result of a method.
 *
 * @param {ExcludeSensitiveFieldsOptions} options - The options object to configure the decorator.
 * @returns {Function} A decorator function that modifies the target method to exclude specified fields from its result.
 */
export function ExcludeSensitiveFields(
  options: ExcludeSensitiveFieldsOptions = {},
) {
  const {
    fields = ['password', 'createdAt', 'updatedAt'],
    overrideDefaultList = false,
    applyOnNested = true,
  } = options;

  const finalFields = overrideDefaultList
    ? fields
    : fields.concat(['password', 'createdAt', 'updatedAt']);

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    const excludeFields = (obj: any, fields: string[]) => {
      fields.forEach((field) => delete obj[field]);
    };

    const traverseAndExclude = (obj: any, fields: string[]) => {
      if (!obj || typeof obj !== 'object') return;

      excludeFields(obj, fields);

      Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((item: any) => traverseAndExclude(item, fields));
        } else if (typeof obj[key] === 'object') {
          traverseAndExclude(obj[key], fields);
        }
      });
    };

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);

      if (Array.isArray(result)) {
        result.forEach((item) => {
          if (applyOnNested) {
            traverseAndExclude(item, finalFields);
          } else {
            excludeFields(item, finalFields);
          }
        });
        return result;
      } else {
        if (applyOnNested) {
          traverseAndExclude(result, finalFields);
        } else {
          excludeFields(result, finalFields);
        }
        return result;
      }
    };

    return descriptor;
  };
}
