export const useMapEnumToSelect = (
  enumObj: { [key: string]: string },
) => {
  const mapped = Object.values(enumObj).map((value: string) => {
    const label = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    return {
      value,
      label,
    }
  })

  return mapped;
};

export const getEnumTranslationKey = (
  value: string,
  translationPrefix: string
) => {
  const transform = (value: string) => {
    const words = value.split("_");
    return words
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  };

  return `${translationPrefix}.${transform(value)}`;
};
