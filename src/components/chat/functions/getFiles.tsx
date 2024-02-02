import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getFiles = async ({
  pageParam,
  fileIds,
  setLastFetchedFiles,
}: {
  pageParam: number | undefined;
  fileIds: string[];
  setLastFetchedFiles: (id: string) => void;
}) => {
  const supabase = createClientComponentClient();
  if (pageParam === undefined) throw new Error("No page param");
  //error that basically I can't get the data if there is no files in a particular message and lots of errors in the console
  const response = await supabase
    .from("messages")
    .select(`*, users (username, profile_pic_url)`)
    .in("id", fileIds.slice((pageParam - 1) * 10, (pageParam - 1) * 10 + 10));
  if (response.error) throw new Error(response.error.message);

  if (response.data.length > 0) setLastFetchedFiles(response.data[0].id);
  return response.data;
};
