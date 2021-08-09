import React from "react";
import { User } from "~/util/schema";

type Props = {
  currentUser: User;
}

export const Template = ({ currentUser }: Props) => {
  return (
    <div>
      {currentUser.name}
    </div>
  )
}
