import http from "@/utils/http";

export const getRoleOptions = async () => {
  const { data } = await http.get("role/options");
  return data.map((v:any)=>{
    return {
        label:v.name,
        value:v._id
    }
  });
};
