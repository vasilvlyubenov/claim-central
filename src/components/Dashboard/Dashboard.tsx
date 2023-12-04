/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

import { useGetAllClaimsQuery } from '../../features/claim/claimApi';

import Spinner from 'components/common/Spinner/Spinner';
import './Dashboard.css';


export default function Dashboard() {
    const { data, isLoading, isSuccess } = useGetAllClaimsQuery([]);
    const [totalClaims, setTotalClaims] = useState(0);
    const [openClaims, setOpenClaims] = useState(0);
    const [closedClaims, setClosedClaims] = useState(0);

    useEffect(() => {
        setTotalClaims(0);
        setOpenClaims(0);
        setClosedClaims(0);
    }, [setClosedClaims, setOpenClaims, setTotalClaims]);

    useEffect(() => {
        if (isSuccess) {
            data.forEach(claim => {
                setTotalClaims(state => state + 1);

                if (claim.open === true) {
                    setOpenClaims(state => state + 1);
                } else {
                    setClosedClaims(state => state + 1);
                }
            });

        }

    }, [isSuccess, data]);

    return (
        <>
            {isLoading
                ? <Spinner />
                :
                <>
                    <h1 className='h1 text-color'>Claims overview</h1>
                    <div className="bg-white py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">

                                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                    <dt className="text-base leading-7 text-gray-600">Total claims</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl text-color">
                                        {totalClaims}
                                    </dd>
                                </div>
                                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                    <dt className="text-base leading-7 text-gray-600">Open claims</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl text-color">
                                        {openClaims}
                                    </dd>
                                </div>
                                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                    <dt className="text-base leading-7 text-gray-600">Closed claims</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl text-color">
                                        {closedClaims}
                                    </dd>
                                </div>

                            </dl>
                        </div>

                    </div>
                    <Chart
                        chartType="PieChart"
                        data={[['Claims', 'Number of claims'], ['Open claims', openClaims], ['Closed claims', closedClaims]]}
                        width="100%"
                        options={{ is3D: true }}
                        height="400px"
                        legendToggle
                    />
                </>
            }
        </>
    );
}