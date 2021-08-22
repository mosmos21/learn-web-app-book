import React from "react";
import { useHook } from "~/templates/categories/useHook";
import { Form } from "~/templates/categories/Form";

export const Template = () => {
  const [
    { categories },
    { addCategory }
  ] = useHook();

  return (
    <div>
      <Form onSubmit={addCategory} />
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            {category.name}
          </div>
        ))}
      </div>
    </div>
  )
}
