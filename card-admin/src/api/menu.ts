import http from "@/utils/http";

import { arrayToTree } from "performant-array-to-tree";

export const loadMenus = async () => {
  const { data } = await http.get("menu");
  return arrayToTree(data.data.map((v:any)=>{
    return {
        label:v.name,
        parent:v.parent,
        value:v._id
    }
  }), {
    parentId: "parent",
    id: "value",
    dataField: null,
  });
};

