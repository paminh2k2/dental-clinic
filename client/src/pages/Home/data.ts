import dayjs, {Dayjs} from 'dayjs'

interface DataType {
    key: string;
    name: string;
    date: Dayjs;
    time: Dayjs;
    services: string[];
}

export const initalData: DataType[] = []
