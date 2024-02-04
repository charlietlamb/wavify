import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const getMessages = async ({
  pageParam,
  messageIds,
  setLastFetched,
}: {
  pageParam: number | undefined;
  messageIds: string[];
  setLastFetched: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (pageParam === undefined) throw new Error("No page param");
  const supabase = createClientComponentClient();
  const response = await supabase
    .from("messages")
    .select(
      `
            *,
            users ( username, profile_pic_url)
        `
    )
    .in(
      "id",
      messageIds.slice((pageParam - 1) * 25, (pageParam - 1) * 25 + 25)
    );
  // Check if the request was successful
  if (response.error) {
    throw new Error(response.error.message);
  }

  // Return the data from the response
  if (response.data.length > 0) setLastFetched(response.data[0].id);
  return response.data;
};
