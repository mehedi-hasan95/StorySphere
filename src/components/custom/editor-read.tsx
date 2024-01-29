"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

export const EditorRead = ({ data }: any) => {
  //   Editor setup
  const Editor = useMemo(
    () => dynamic(() => import("@/components/custom/editor"), { ssr: false }),
    []
  );
  const onChange = () => {};
  return (
    <Editor
      initialContent={data}
      onChange={() => {
        onChange;
      }}
      editable={false}
    />
  );
};
