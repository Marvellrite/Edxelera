export type ProfileSummaryProps = {
  name: string;
  email: string;
  dateOfBirth: string;
  location: string;
  dateJoined: string;
  bio: string;
};

export type PersonalInfoProps = ProfileSummaryProps & {
  linksTitle?: string;
  links?: ProfileLinkItem[];
};


export type ProfileLinkItem = {
   label: string;
   value: string;
   href?: string;
};

export type ProfileLinksProps = {
   title?: string;
   items?: ProfileLinkItem[];
   className?: string;
};