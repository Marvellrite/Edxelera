'use client';

import { useEffect } from 'react';
import clearCookie from '@/lib/utils/expire-cookie';

const ClearPendingEmailOnLoad = () => {
  useEffect(() => {
    clearCookie('pendingEmail');
  }, []);

  return null;
};

export default ClearPendingEmailOnLoad;

