import { twMerge } from 'tailwind-merge';

export const cn = (...classValues: ClassValue[]) =>
  twMerge(mergeClasses(classValues));

type ClassValue =
  | string
  | string[]
  | Record<string, boolean>
  | null
  | undefined;

/**
 * Utility for constructing `class` names conditionally.
 *
 * Inspired by `clsx` https://github.com/lukeed/clsx.
 */
function mergeClasses(...classValues: ClassValue[]): string {
  let classString = '';

  for (const classValue of classValues) {
    if (classValue === null || classValue === undefined) {
      continue;
    }

    if (typeof classValue === 'string') {
      classString += `${classValue} `;
    }

    if (Array.isArray(classValue)) {
      classValue.forEach(inputPart => (classString += `${inputPart} `));
    }

    if (typeof classValue === 'object') {
      for (const [key, val] of Object.entries(classValue)) {
        if (!!val) {
          classString += `${key} `;
        }
      }
    }
  }

  return classString;
}
