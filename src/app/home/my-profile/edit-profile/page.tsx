'use client';

import { EditProfileView } from '@/features/edit-profile/components/edit-profile-view';

export default function Page() {
   return (
      <EditProfileView
         defaultValues={{
            bio: '',
            location: '',
            learningGoal: '',
            website: '',
            facebook: '',
            x: '',
            linkedIn: '',
            instagram: '',
         }}
      />
   );
}
