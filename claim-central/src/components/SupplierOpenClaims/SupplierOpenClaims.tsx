import { useSupplierClaimsQuery } from '../../features/claim/claimApi';
import { Link } from 'react-router-dom';

import './SupplierOpenClaim.css';

import Spinner from 'components/common/Spinner/Spinner';

export default function SupplierOpenClaims() {
  const { data, isLoading } = useSupplierClaimsQuery([]);


  return (
    <>
      {isLoading ? 
      <Spinner /> : 
        <ul role="list" className="divide-y divide-gray-100 ">
          {data?.claims.map((claim, i) => (
            <li key={i} className="flex justify-around gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <Link to={`claim/${claim.uid}`} className="text-sm font-semibold leading-6 text-gray-900">{claim.subject}</Link>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{claim.dateOpen}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{claim.issueDescription}</p>
                {claim.open ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Open
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Closed</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      }
    </>
  );
}