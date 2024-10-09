import Input from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { getUser } from "@/utils/server-utils";
import React from "react";

export default function AccountDetailsPage() {
  const user = getUser()!;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="mb-9 text-center text-h1-desktop">Account details</h1>
      <form id="user-details" name="user-details">
        <div className="mb-12">
          <Input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            defaultValue={user.firstName}
            className="text-body-medium text-dark-gray"
            formControllClassName="mb-9"
          />
          <Input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            defaultValue={user.lastName}
            className="text-body-medium text-dark-gray"
            formControllClassName="mb-9"
          />
          <Input
            type="text"
            name="userName"
            id="userName"
            placeholder="User Name"
            defaultValue={user.userName}
            className="text-body-medium text-dark-gray"
            formControllClassName="mb-9"
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            defaultValue={user.email}
            className="text-body-medium text-dark-gray"
          />
        </div>
        <div>
          <h3 className="mb-10 text-body-large font-bold">Password change</h3>
          <Input
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="Current password (leave blank to leave unchanged)"
            className="text-body-medium text-dark-gray"
            formControllClassName="mb-9"
          />
          <Input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New password (leave blank to leave unchanged)"
            className="text-body-medium text-dark-gray"
            formControllClassName="mb-9"
          />
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm new password"
            className="text-body-medium text-dark-gray"
          />
        </div>
        <SubmitButton className="mt-16 w-full py-4 text-body-large uppercase">
          Save changes
        </SubmitButton>
      </form>
    </div>
  );
}
