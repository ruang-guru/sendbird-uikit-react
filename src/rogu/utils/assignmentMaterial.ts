export const isAssignmentMessage = (customType: string): boolean =>
  customType === "assignment";

export const isMaterialMessage = (customType: string): boolean =>
  customType === "material";

export const convertCtaLinkToWebLink = (
  cta: string,
  customType: string
): string => {
  const listOfSerials = cta.split("&");
  const workspaceSerial = listOfSerials[1].split("=")[1];
  const classroomSerial = listOfSerials[2].split("=")[1];
  const serial = listOfSerials[3].split("=")[1];
  const type_ = customType === "assignment" ? "assignment" : "material";
  const url = `https://kelas.ruangguru.com/workspace/${workspaceSerial}/classroom/${classroomSerial}/${type_}/detail/${serial}`;

  return url;
};

export const convertAssignmentDueUTCtoLocale = (dueAt: string): string => {
  const localeDate = new Date(dueAt).toLocaleString();
  return localeDate;
};
