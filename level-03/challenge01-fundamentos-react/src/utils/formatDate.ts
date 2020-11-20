import { format } from 'date-fns';

const FormatDate = (date: Date): string => format(new Date(date), 'dd/MM/yyyy');

export default FormatDate;
