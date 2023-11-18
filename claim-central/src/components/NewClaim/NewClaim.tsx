import { useGetAllSuppliersQuery } from '../../features/user/userApi';
import Spinner from 'components/common/Spinner/Spinner';
import './NewClaim.css';


export default function NewClaim() {
    const { data, isFetching, error } = useGetAllSuppliersQuery([]);
    
    return (
        <>{isFetching ? <Spinner /> :
            <div className="min-h-screen flex items-center justify-center text-central open">
                <div className="w-full max-w-md p-4">

                    <form>
                        <div className="mb-4">
                            <select className="w-full p-2 border border-gray-300 rounded" name="supplier" id="supplier-select">
                                {data?.map((d, i) => <option key={i} value={d.firm}>{d.firm}</option>)
                                }
                            </select>
                            <button
                                type="submit"
                                className="w-full text-white p-2 rounded"
                            >
                                Open claim
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </>
    );
}