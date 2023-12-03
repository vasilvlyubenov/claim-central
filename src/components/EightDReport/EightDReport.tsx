import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { saveAs } from 'file-saver';

import './EightDReport.css';

import { EightDReport } from '../../types/EightDReport';
import { useGetClaimByIdQuery } from '../../features/claim/claimApi';
import { useParams } from 'react-router-dom';
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
    const [preventiveDate, setPreventiveDate] = useState<Date | null>(null);
    const { claimId } = useParams();
    const { data, isLoading } = useGetClaimByIdQuery(claimId);
    const currentDate = new Date();

    useEffect(() => {
        setFormData(state => ({
            ...state,
            correctiveActionDeadline: correctiveDate,
            preventiveActionDeadline: preventiveDate
        }));
    }, [correctiveDate, preventiveDate]);

    const handleFormData = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(state => ({ ...state, [name]: value }));
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Submitting 8D Report:', formData);
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
            {isLoading
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

                        {data?.claim?.filePath && <button className="download-btn" onClick={handleDownload}>Download</button>}
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
                                dateFormat="dd/MM/yyyy"
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
                                name='correctiveActions'
                                value={formData.correctiveActions}
                                onChange={handleFormData}
                                className="mt-1 p-2 border rounded-md w-full"
                            />
                            <span className='font-medium'>Deadline: </span>
                            <DatePicker
                                className='datepicker'
                                showIcon
                                dateFormat="dd/MM/yyyy"
                                selected={formData.correctiveActionDeadline}
                                onChange={setCorrectiveDate} />
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
                                dateFormat="dd/MM/yyyy"
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
                                name='rootCauseAnalysis'
                                value={formData.rootCauseAnalysis}
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