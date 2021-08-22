import React from "react";
import { SchemaModel } from "@app/schema";

type Props = {
  currentUser: SchemaModel.User;
}

export const Template = ({ currentUser }: Props) => {
  return (
    <div>
      {currentUser.name}
    </div>
  )
}
