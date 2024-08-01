import { useState } from "react"


export const useRevenue  = () => {
    const [profiles, setProfiles ] = useState()
    const [ selectedOption, setSelectedOption ] = useState(2)
    const options = [
        { value: 1, label: 'Theo bệnh nhân' },
        { value: 2, label: 'Theo Dịch vụ' },
        { value: 3, label: "Trong năm" }
    ]
    const monthoptions = [
        { value: 1, label: 'Tháng 1' },
        { value: 2, label: 'Tháng 2' },
        { value: 3, label: 'Tháng 3' },
        { value: 4, label: 'Tháng 4' },
        { value: 5, label: 'Tháng 5' },
        { value: 6, label: 'Tháng 6' },
        { value: 7, label: 'Tháng 7' },
        { value: 8, label: 'Tháng 8' },
        { value: 9, label: 'Tháng 9' },
        { value: 10, label: 'Tháng 10' },
        { value: 11, label: 'Tháng 11' },
        { value: 12, label: 'Tháng 12' },
    ]
    const onChangeOption = ( value: number ) => {
        setSelectedOption(value)
    }
    return {
        options,
        monthoptions,
        selectedOption,
        onChangeOption
    }
}