import { ErrorToast, SuccessToast } from "@/components/toast/toaster";
import { SUCCESS_TOAST_DURATION_MS } from "./constants";
import { ResetPasswordPayload, ResetPasswordStep } from "./types";
import { ResetPassSchema } from "@/schemas/reset-password.schema";
import { AuthResponse } from "../types";
import { toast } from "react-toastify";
import { UseMutateFunction } from "@tanstack/react-query";
import getCookie from "@/lib/utils/getCookie";

/**
 * TYPES FOR DEPENDENCIES (cleaner than `any`)
 */
type MoveToStep = (
  step: ResetPasswordStep,
  data?: { email?: string; resetToken?: string }
) => void;

type ClearFlow = () => void;

type RouterLike = {
  push: (path: string) => void;
};

/**
 * SUCCESS HANDLERS
 */

export const handleEmailSuccess = (
  moveToStep: MoveToStep,
  { email: nextEmail }: { email: string }
) => {
  moveToStep("otp", { email: nextEmail, resetToken: "" });
};

export const handleOtpSuccess = (
  moveToStep: MoveToStep,
  { resetToken }: { resetToken?: string|null }
) => {
  if (!resetToken) {
    toast.error(
      () => (
        <ErrorToast
          msg={{
            title: "Error",
            body: "We could not start your reset session. Please request a new code.",
          }}
        />
      ),
      { closeButton: false }
    );
    return;
  }

  moveToStep("change", { resetToken });
};

export const handlePasswordResetSuccess = (
  clearFlow: ClearFlow,
  router: RouterLike
) => {
  clearFlow();

  toast.success(
    () => (
      <SuccessToast
        msg={{
          title: "Success",
          body: "Password reset successfully",
        }}
      />
    ),
    {
      closeButton: false,
      autoClose: SUCCESS_TOAST_DURATION_MS,
      onClose: () => router.push("/auth"),
    }
  );
};

/**
 * FLOW HELPERS
 */

export const isResetPasswordStep = (
  value: string | null
): value is ResetPasswordStep =>
  value === "email" || value === "otp" || value === "change";

export const buildStepHref = (
  pathname: string,
  step: ResetPasswordStep,
  email?: string
) => {
  const params = new URLSearchParams();
  params.set("step", step);

  if (email) {
    params.set("email", email);
  }

  return `${pathname}?${params.toString()}`;
};

export const resolveFlowState = (
  searchParams: URLSearchParams,
  storedEmail: string,
  storedToken: string
) => {
  const queryEmail = searchParams.get("email") || "";
  const queryToken = searchParams.get("token") || "";
  const requestedStep = searchParams.get("step");

  const nextEmail = queryEmail || storedEmail;
  const nextResetToken = queryToken || storedToken;

  let nextStep: ResetPasswordStep = isResetPasswordStep(requestedStep)
    ? requestedStep
    : "email";

  if (queryToken && nextEmail) {
    nextStep = "change";
  }

  if (nextStep === "change" && (!nextEmail || !nextResetToken)) {
    nextStep = nextEmail ? "otp" : "email";
  }

  if (nextStep === "otp" && !nextEmail) {
    nextStep = "email";
  }

  return {
    step: nextStep,
    email: nextEmail,
    resetToken: nextResetToken,
  };
};

/**
 * ACTION HANDLER
 */

export const handlePasswordReset = (
  data: ResetPassSchema,
  email: string,
  resetToken: string | undefined,
  resetPassword: UseMutateFunction<
    AuthResponse,
    Error,
    ResetPasswordPayload,
    unknown
  >
) => {
  if (!email || !resetToken) {
    toast.error(
      () => (
        <ErrorToast
          msg={{
            title: "Error",
            body: "Your reset session is missing. Please request a new verification code.",
          }}
        />
      ),
      { closeButton: false }
    );
    return;
  }

  resetPassword({
    email,
    token: resetToken,
    password: data.password,
  });
};

export const extractResetToken = () => {
  return getCookie('reset_token')
};

