import React from "react";
import { useHook } from "~/templates/top/useHook";
import { Form } from "~/templates/top/Form";

export const Template = () => {
  const [
    { categories, tasks }
  ] = useHook();

  return (
    <div>
      <Form categories={categories} onSubmit={() => {}}/>
    </div>
  )
}
