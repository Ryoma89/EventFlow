export const formatDateTime = (date: Date) => {
  const isoString = date.toISOString();
  const formattedDateTime = isoString.slice(0, 19).replace('T', ' ');
  
  return { dateTime: formattedDateTime };
};

export const convertToAbsolutePath = (relativePath: string) => {
  if (relativePath.startsWith('../../assets/images/')) {
    return relativePath.replace('../../assets/images/', '/');
  }
  return relativePath;
};
