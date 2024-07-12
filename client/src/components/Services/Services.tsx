interface Service {
    name: string;
    unit: string;
    price: string;
    note: string;
}

interface ServiceData {
    title: string;
    service: Service[];
}
const Services: React.FC<ServiceData> = ({title, service}) => {
    return (
        <div className='ml-3'>
            <p className="font-medium">{title}</p>
            <ul className='ml-3 font-normal'>
                {service.map((s, index) => {
                    return (
                        <li key={index}className="grid grid-cols-4">
                            <span>{s.name}</span>
                            <span>{s.unit}</span>
                            <span>{s.price}</span>
                            <span>{s.note}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Services