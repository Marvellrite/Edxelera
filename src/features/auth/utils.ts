export const maskEmail = (value: string) => {
   const [localPart = '', domain = ''] = value.split('@');

   if (!localPart || !domain) {
      return value;
   }

   if (localPart.length <= 2) {
      return `${localPart[0] ?? '*'}***@${domain}`;
   }

   return `${localPart.slice(0, 2)}***@${domain}`;
};