
interface DataType {
    ms: Number,
    name: string,
    date: Object,
    time: Object,
    doctor: String,
    services: Array<String>,
    }
    
const data: DataType[] = [
    { ms: 0,name: 'Phạm Anh Minh', date: {day: 10, month: 12, year: 2024}, time: {hour: 9, minute: 0}, doctor:"Phạm Ngọc Dậu", services: ['Chụp hình X-quang cận chóp', 'Trám răng', "Nhổ răng", "Bọc sứ"] },
    { ms: 246,name: 'Phạm Huỳnh Ngọc Niềm', date: {day: 7, month: 6, year: 2024}, time: {hour:10,minute:0}, doctor: "Phạm Ngọc Dậu", services: ['Cạo vôi', 'Trám răng'] },
];

export {
    data
};

