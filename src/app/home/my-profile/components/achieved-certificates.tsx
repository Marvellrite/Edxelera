import React from 'react';
import Certificates, { type CertificateCardProps } from './certificates';

type AchievedCertificatesProps = {
   certificates: CertificateCardProps[];
};

const AchievedCertificates = ({
   certificates,
}: AchievedCertificatesProps) => {
   return (
      <div className="space-y-3">
         <p className="font-normal text-md text-primary">Certificates</p>
         <div className="flex gap-3 overflow-x-auto smooth snap-proximity">
            {certificates.map((certificate, index) => (
               <Certificates
                  key={`${certificate.title}-${certificate.reception_date}-${index}`}
                  {...certificate}
               />
            ))}
         </div>
      </div>
   );
};

export default AchievedCertificates;
