import getMapId from "@/lib/getMapId";

export async function getFilterComponent(data: any, postType: string, customCallback?: (data: any) => Promise<any>) {
  if (!data?.section_check) return null;
  if (customCallback) return await customCallback(data);
  return await getMapId({ type: postType, id: data.repeater });
}
