import { getVehicleStatus, formatDate } from '../../utils/helpers';
import Heli from '../../assets/icons/helikopter.svg';
import Dispatch from '../../assets/icons/dispatch.svg';
import Satelit from '../../assets/icons/uplink.svg';
import Bat from '../../assets/icons/battery.svg';
import Truck from '../../assets/truckBox.png';

const VehicleCard = ({ vehicle }) => {
    const {
        plate,
        gsm_no,
        activation_time,
        expired_gsm,
        acc,
        speed,
        device_name,
        last_positioning,
        battery
    } = vehicle;

    const status = getVehicleStatus(acc, speed);

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center p-4 ">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#7A7A7A]">Status:</span>
                    <div className='flex items-center gap-1'>
                        <img src={Dispatch} alt="Fastruck" width="20" height="20" />
                        <span className="text-sm text-bold">Dispatch</span>
                    </div>
                </div>
            </div>

            <div className="md:p-4 p-2">
                <div className="flex items-center mb-4">
                    <div className="flex flex-col items-center mr-4">
                        <div className="text-sm text-[#4B465C]">{speed || 0}km/h</div>
                        <div className="text-xs text-[#4B465C]/10">Odo: 1000km</div>
                    </div>
                    <div>
                        <img src={Truck} alt="Fastruck" width="37" height="52" />
                    </div>
                    <div>
                        <div className="text-[12px] text-[#BABABA]">Shipment Number: <span className='text-xs text-[#1A1A1A]'>35ACB95238</span></div>
                        <div className="text-[16px] text-[#000000] font-semibold">{plate || 'Unknown'} - TRUCK 0001</div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4 gap-1">
                    <div className="flex items-center">
                        <div className={` ${acc === 'ON' ? 'bg-green-500' : 'bg-red-500'} rounded`}></div>
                        <span className="text-[12px] font-bold">ACC {acc}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <img src={Satelit} alt="Fastruck" width="20" height="20" />
                        <span className="text-[12px] font-bold">N/A</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <img src={Bat} alt="Fastruck" width="20" height="20" />
                        <span className="text-[12px font-bold">{battery || 0}%</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 bg-[#F5F6FA] px-2 py-2">
                    <div className="flex items-center gap-1 text-[10px]">
                        <span className=" font-medium">Data Terakhir:</span>
                        <span>{last_positioning || '-'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                        <span className="text-sm font-medium">No GSM:</span>
                        <span >{gsm_no || '-'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                        <span className="font-medium">Expired:</span>
                        <span>{formatDate(expired_gsm)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;