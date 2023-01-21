import React from "react";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = await getProviders();
  return (
    <div className="grid justify-center">
      <div>
        <Image
          src="https:/links.papareact.com/161"
          className="rounded-full mx-2 object-cover mb-20 "
          alt="pfp"
          height={400}
          width={400}
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;
