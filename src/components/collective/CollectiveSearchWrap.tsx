"use client";

import { useEffect, useState } from "react";
import { getData } from "./(sidebar)/(functions)/getData";
import CollectiveSearch from "./CollectiveSearch";
import { useColUserUpdateEffect } from "./hooks/useColUserUpdateEffect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CollectiveSearchWrap({
  spaces,
  colUsers: colUsersInit,
  collective,
}: {
  spaces:
    | {
        textSpaces: Space[];
        audioSpaces: Space[];
        videoSpaces: Space[];
      }
    | undefined;
  colUsers: ColUserAndData[];
  collective: Collective;
}) {
  const supabase = createClientComponentClient();
  const [colUsers, setColUsers] = useState<ColUserAndData[]>(colUsersInit);
  const newData = spaces
    ? (getData(
        spaces.textSpaces,
        spaces.audioSpaces,
        spaces.videoSpaces,
        colUsers
      ) as unknown as SearchData)
    : ([] as unknown as SearchData);
  const [data, setData] = useState<SearchData>(newData);
  useColUserUpdateEffect(
    supabase,
    colUsers,
    setColUsers,
    collective,
    "_searchMap"
  );
  useEffect(() => {
    const newData = spaces
      ? (getData(
          spaces.textSpaces,
          spaces.audioSpaces,
          spaces.videoSpaces,
          colUsers
        ) as unknown as SearchData)
      : ([] as unknown as SearchData);
    setData(newData);
  }, [colUsers]);
  return (
    <div className="mt-2">
      <CollectiveSearch data={spaces ? data : ([] as unknown as SearchData)} />
    </div>
  );
}
