export const getErrorMessage = async (res: Response): Promise<string> => {
  const text = await res.text();
  const json = JSON.parse(text || "{}");

  return json["message"] || "";
};
