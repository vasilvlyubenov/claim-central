import { useEffect } from 'react';
import { useSupplierClaimsQuery } from '../../features/claim/claimApi';
import { Link } from 'react-router-dom';

import './SupplierOpenClaim.css';

import Spinner from 'components/common/Spinner/Spinner';

export default function SupplierOpenClaims() {
  const { data, isLoading, refetch } = useSupplierClaimsQuery([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {isLoading ?
        <Spinner /> :
        (data?.length === 0)
          ? <h1 className='no-claims'>No claims are available</h1>
          : <ul role="list" className="divide-y divide-gray-100 ">
            {data?.map((claim, i) => (
              <li key={i} className="flex justify-center gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <Link to={`/report/${claim.id}`} className="text-sm font-semibold leading-6 text-central underln">{claim.subject}</Link>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{claim.dateOpen}</p>

                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
                      <p className="text-sm leading-6 text-gray-900 customer-email">{claim.customerEmail}</p>
                      {claim.open ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500 open">
                          Open
                        </p>
                      ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <p className="text-xs leading-5 text-gray-500 closed">Closed</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
      }
    </>
  );
}