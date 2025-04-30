import { useState, useEffect } from 'react';
import authService from '../../services/authService';
import VehicleCard from './VehicleCard.jsx';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVehicles = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.getVehicles();

            if (response.status && response.message?.data) {
                setVehicles(response.message.data);
            } else {
                throw new Error('Failed to fetch vehicles');
            }
        } catch (err) {
            console.error('Error fetching vehicles:', err);
            setError('Failed to load vehicles. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <i className="fas fa-circle-notch fa-spin text-primary text-2xl mb-2"></i>
                    <p className="text-gray-600">Loading vehicles...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
                <p>{error}</p>
                <button
                    className="mt-2 text-sm underline"
                    onClick={fetchVehicles}
                >
                    Retry
                </button>
            </div>
        );
    }

    if (vehicles.length === 0) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded my-4">
                <p>No vehicles found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((vehicle, index) => (
                <VehicleCard key={vehicle.imei || index} vehicle={vehicle} />
            ))}
        </div>
    );
};

export default VehicleList;