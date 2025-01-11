export const mapErrorMessage = (data: object) => {
  let errorMessages: string[] = [];
  Object.entries(data).map(([, value]) =>
    value.map((item: string) => (errorMessages = [...errorMessages, item]))
  );
  return errorMessages;
};
