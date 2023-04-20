import http from "@/utils/http";

export const getPermissionOptions = async () => {
  const { data } = await http.get("permission/options");
  return data;
};
