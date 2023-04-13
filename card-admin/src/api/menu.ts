import http from "@/utils/http";

import { arrayToTree } from "performant-array-to-tree";

export const loadMenus = async () => {
  const { data } = await http.get("menu");
  return arrayToTree(data.data, {
    parentId: "parent",
    id: "_id",
    dataField: null,
  });
};
