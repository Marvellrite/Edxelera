'use client';

import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { FLOW_EMAIL_KEY, FLOW_TOKEN_KEY, } from '../constants';
import { resolveFlowState, buildStepHref } from '../utils';
import type { ResetPasswordStep } from '../types';

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export const useResetPasswordFlow = () => {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const hasHydrated = useSyncExternalStore(
      subscribe,
      getClientSnapshot,
      getServerSnapshot
   );

   const flowState = useMemo(() => {
      if (!hasHydrated) {
         return {
            step: 'email' as ResetPasswordStep,
            email: '',
            resetToken: '',
            isReady: false,
         };
      }

      const storedEmail = window.sessionStorage.getItem(FLOW_EMAIL_KEY) || '';
      const storedToken = window.sessionStorage.getItem(FLOW_TOKEN_KEY) || '';
      const resolvedState = resolveFlowState(
         searchParams,
         storedEmail,
         storedToken
      );

      return {
         ...resolvedState,
         isReady: true,
      };
   }, [hasHydrated, searchParams]);

   const { step, email, resetToken, isReady } = flowState;

   useEffect(() => {
      if (!isReady) {
         return;
      }

      if (email) {
         window.sessionStorage.setItem(FLOW_EMAIL_KEY, email);
      } else {
         window.sessionStorage.removeItem(FLOW_EMAIL_KEY);
      }

      if (resetToken) {
         window.sessionStorage.setItem(FLOW_TOKEN_KEY, resetToken);
      } else {
         window.sessionStorage.removeItem(FLOW_TOKEN_KEY);
      }
   }, [email, isReady, resetToken]);

   useEffect(() => {
      if (!isReady) {
         return;
      }

      const normalizedHref = buildStepHref(pathname, step, email || undefined);
      const currentHref = `${pathname}${
         searchParams.toString() ? `?${searchParams.toString()}` : ''
      }`;

      if (currentHref !== normalizedHref) {
         router.replace(normalizedHref);
      }
   }, [email, isReady, pathname, router, searchParams, step]);

   const moveToStep = (
      nextStep: ResetPasswordStep,
      nextState?: { email?: string; resetToken?: string }
   ) => {
      const resolvedEmail = nextState?.email ?? email;
      const resolvedResetToken =
         nextState?.resetToken !== undefined ? nextState.resetToken : resetToken;

      if (resolvedEmail) {
         window.sessionStorage.setItem(FLOW_EMAIL_KEY, resolvedEmail);
      } else {
         window.sessionStorage.removeItem(FLOW_EMAIL_KEY);
      }

      if (resolvedResetToken) {
         window.sessionStorage.setItem(FLOW_TOKEN_KEY, resolvedResetToken);
      } else {
         window.sessionStorage.removeItem(FLOW_TOKEN_KEY);
      }

      router.replace(
         buildStepHref(pathname, nextStep, resolvedEmail || undefined)
      );
   };

   const clearFlow = () => {
      window.sessionStorage.removeItem(FLOW_EMAIL_KEY);
      window.sessionStorage.removeItem(FLOW_TOKEN_KEY);
   };

   return {
      step,
      email,
      resetToken,
      isReady,
      moveToStep,
      clearFlow,
      router,
   };
};
