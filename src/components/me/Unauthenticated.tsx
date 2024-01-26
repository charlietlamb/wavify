"use client"
import AuthSwiper from "./AuthSwiper";
import LogInSignUpTabs from "./LogInSignUp";

export default function Unauthenticated() {
  return (
    <div className="account-wrapper min-h-[80vh] flex flex-row">
      <div className="accountLeft lg:w-[50vw] w-[100vw] flex flex-row items-center justify-center">
        <LogInSignUpTabs />
      </div>
      <div className="accountRight w-[50vw] border-l border-l-1 border-primary lg:flex hidden">
        <AuthSwiper />
      </div>
    </div>
  )
}
