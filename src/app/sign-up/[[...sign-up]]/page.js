import { SignUp UserButton } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <>
      <h1>Sign up please</h1>
      <SignUp />
      <UserButton
      userProfileProps={{
        appearance: {
          elements: {
          },
        }
      }}
      appearance={{
        elements: {
          userButtonPopoverFooter: {
            display: 'none',
          },
        },
      }}
    />
    </>
  );
}
