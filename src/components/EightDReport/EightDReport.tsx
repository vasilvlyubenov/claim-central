import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { saveAs } from 'file-saver';

import './EightDReport.css';

import { useAppSelector } from '../../app/hooks';
import { EightDReport } from '../../types/EightDReport';
import { useGetClaimByIdQuery, useGetReportByClaimIdQuery, useSaveReportMutation } from '../../features/claim/claimApi';
import Spinner from 'components/common/Spinner/Spinner';

const initialState: EightDReport = {
    descriptionId: '',
    containmentActions: '',
    rootCauseAnalysis: '',
    correctiveActions: '',
    correctiveActionDeadline: null,
    verifyCorrectiveActions: '',
    verifyCorrectiveActionsDeadline: null,
    preventiveActions: '',
    preventiveActionDeadline: null,
    teamRecognition: '',
};

export default function EightDReportPage() {
    const [formData, setFormData] = useState(initialState);
    const [correctiveDate, setCorrectiveDate] = useState<Date | null>(null);
    const [verifyCorrectiveDate, setVerifyCorrectiveDate] = useState<Date | null>(null);
    const [preventiveDate, setPreventiveDate] = useState<Date | null>(null);
    const [isCustomer, setIsCustomer] = useState(false);
    const { claimId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetClaimByIdQuery(claimId);
    const {data: reportData, isLoading: isReporLoading, isSuccess: isReportDataSuccess, refetch} = useGetReportByClaimIdQuery(claimId);
    const [saveReport, {isLoading: isSaveReportLoading, isSuccess: isSaveReportSuccess}] = useSaveReportMutation();
    const selector = useAppSelector(selector => selector.user);
    const currentDate = new Date();

    useEffect(() => {
        refetch();

        if (selector.userType === 'customer') {
            setIsCustomer(true);
        } else {
            setIsCustomer(false);
        }
    }, [refetch, selector]);
    

    useEffect(() => {
        
        if (isReportDataSuccess) {
            setFormData(state => ({
                ...state,
                ...reportData
            }));
            setCorrectiveDate(new Date(reportData.correctiveActionDeadline));
            setVerifyCorrectiveDate(new Date(reportData.verifyCorrectiveActionsDeadline));
            setPreventiveDate(new Date(reportData.preventiveActionDeadline));
        }
    }, [isReportDataSuccess, reportData]);

    useEffect(() => {
        setFormData(state => ({
            ...state,
            correctiveActionDeadline: correctiveDate,
            verifyCorrectiveActionsDeadline: verifyCorrectiveDate,
            preventiveActionDeadline: preventiveDate
        }));
        
        if (isSaveReportSuccess) {
            navigate('/open-claims');
        }
    }, [correctiveDate, verifyCorrectiveDate, preventiveDate, isSaveReportSuccess, navigate]);

    const handleFormData = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(state => ({ ...state, [name]: value }));
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (claimId) {
            setFormData(state => ({ ...state, descriptionId: claimId }));
            saveReport({ref: claimId, report: formData});
        }
    };

    const handleDownload = () => {
        data?.download?.then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = () => {
                const blob = xhr.response;

                saveAs(blob);
            };
            xhr.open('GET', url);
            xhr.send();

        });
    };

    return (
        <>
            {(isLoading || isReporLoading || isSaveReportLoading)
                ? <Spinner />
                : <div className="max-w-3xl mx-auto mt-8 report text-central">
                    <h1 className="text-3xl font-semibold mb-4">8D Report</h1>
                    <h2>Subject: {data?.claim?.subject}</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Issue Description */}
                        <div>
                            <label className="block font-medium">Issue Description</label>

                            <textarea
                                value={data?.claim?.issueDescription}
                                className="mt-1 p-2 border rounded-md w-full"
                                readOnly
                            />
                        </div>

                        {data?.claim?.filePath && <button type="button" className="download-btn" onClick={handleDownload}>Download</button>}
                        {isCustomer && <Link to={`/edit/${claimId}`} className='edit-link'>Edit</Link>}
                        {isCustomer && <button type="button" className="delete-btn" onClick={handleDownload}>Delete</button>}
                        {isCustomer && <button type="button" className="close-btn" onClick={handleDownload}>Close</button>}
                        <hr />
                        {/* Containment Actions */}
                        <div>
                            <label className="block font-medium">Containment Actions</label>
                            {(currentDate <= (new Date(data?.claim?.deadlines?.d3)))
                                ? <span className='deadline'>Until: {data?.claim?.deadlines?.d3}</span>
                                : <span className='deadline-late'>Late</span>}
                            <textarea
                                name='containmentActions'
                                value={formData.containmentActions}
                                onChange={handleFormData}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>

                        {/* Root Cause Analysis */}
                        <div>
                            <label className="block font-medium">Root Cause Analysis</label>
                            {(currentDate <= (new Date(data?.claim?.deadlines?.d4)))
                                ? <span className='deadline'>Until: {data?.claim?.deadlines?.d4}</span>
                                : <span className='deadline-late'>Late</span>}
                            <textarea
                                name='rootCauseAnalysis'
                                value={formData.rootCauseAnalysis}
                                onChange={handleFormData}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>

                        {/* Corrective Actions */}
                        <div>
                            <label className="block font-medium">Corrective Actions</label>
                            {(currentDate <= (new Date(data?.claim?.deadlines?.d5)))
                                ? <span className='deadline'>Until: {data?.claim?.deadlines?.d5}</span>
                                : <span className='deadline-late'>Late</span>}
                            <textarea
                                name='correctiveActions'
                                value={formData.correctiveActions}
                                onChange={handleFormData}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            <span className='font-medium'>Deadline: </span>
                            <DatePicker
                                className='datepicker'
                                showIcon
                                dateFormat="yyyy/MM/dd"
                                selected={formData.correctiveActionDeadline}
                                onChange={setCorrectiveDate} />
                        </div>

                        {/* Verify Corrective Actions */}
                        <div>
                            <label className="block font-medium">Verify Corrective Actions</label>
                            {(currentDate <= (new Date(data?.claim?.deadlines?.d6)))
                                ? <span className='deadline'>Until: {data?.claim?.deadlines?.d6}</span>
                                : <span className='deadline-late'>Late</span>}
                            <textarea
                                name='verifyCorrectiveActions'
                                value={formData.verifyCorrectiveActions}
                                onChange={handleFormData}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            <span className='font-medium'>Deadline: </span>
                            <DatePicker
                                className='datepicker'
                                showIcon
                                dateFormat="yyyy/MM/dd"
                                selected={formData.verifyCorrectiveActionsDeadline}
                                onChange={setVerifyCorrectiveDate} />
                        </div>

                        {/* Preventive Actions */}
                        <div>
                            <label className="block font-medium">Preventive Actions</label>
                            {(currentDate <= (new Date(data?.claim?.deadlines?.d7)))
                                ? <span className='deadline'>Until: {data?.claim?.deadlines?.d7}</span>
                                : <span className='deadline-late'>Late</span>}
                            <textarea
                                name='preventiveActions'
                                value={formData.preventiveActions}
                                onChange={handleFormData}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            <span className='font-medium'>Deadline: </span>
                            <DatePicker
                                className='datepicker'
                                showIcon
                                dateFormat="yyyy/MM/dd"
                                selected={formData.preventiveActionDeadline}
                                onChange={(setPreventiveDate)} />
                        </div>

                        {/* Team recognition */}
                        <div>
                            <label className="block font-medium">Team recognition</label>
                            {(currentDate <= (new Date(data?.claim?.deadlines?.d4)))
                                ? <span className='deadline'>Until: {data?.claim?.deadlines?.d4}</span>
                                : <span className='deadline-late'>Late</span>}
                            <textarea
                                name='teamRecognition'
                                value={formData.teamRecognition}
                                onChange={handleFormData}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Submit 8D Report
                        </button>
                    </form>
                </div>}
        </>
    );
}