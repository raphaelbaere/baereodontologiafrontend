import React, { useCallback, useState, useMemo, Fragment, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/dist/locale/pt-br';
import BasicModal10 from '../../components/Modal10';
import { BaereContext } from '../../context/BaereProvider';
import { format } from 'date-fns';
import BasicModal14 from '../../components/Modal14';

moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const monthMap = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
};

function convertToISODateString(dateString) {
    // Dividir a string em partes usando o espaço como separador entre data e hora
    const parts = dateString.split(' ');

    // Dividir a parte da data em partes usando '/' como separador
    const lengthPart4 = parts[4].length;
    let horaAUsar = parts[4];

    if (lengthPart4 === 7) {
        horaAUsar = '0' + horaAUsar;
    }

    // Reorganizar as partes para o formato ISO 8601
    const isoDateString = `${parts[3]}-${monthMap[parts[1]]}-${parts[2]}T${horaAUsar}`;

    console.log(isoDateString);

    return isoDateString;
}

export default function Agenda(props, {
    dayLayoutAlgorithm = 'no-overlap',
}) {
    const { setAtualize } = props;
    const [myEvents, setMyEvents] = useState([]);
    const [atualize2, setAtualize2] = useState([]);
    const { urlRequisicao, handleOpen14, setEventSelected } = React.useContext(BaereContext);

    useEffect(() => {


        const fetchEventos = async () => {
            const response = await fetch(`${urlRequisicao}/eventos`);
            const data = await response.json();
            const dataMapped = data.map((evento) => {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                console.log(evento, 'evento')
                const dateObjStart = new Date(evento.start_date);
                const dateObjEnd = new Date(evento.end_date);

                const monthStart = months[dateObjStart.getMonth()];
                const dayOfWeekStart = daysOfWeek[dateObjStart.getDay()];
                const dayStart = dateObjStart.getDate();
                const yearStart = dateObjStart.getFullYear();
                const hourStart = dateObjStart.getHours() + 3;
                const minuteStart = ('0' + dateObjStart.getMinutes()).slice(-2);
                const secondStart = ('0' + dateObjStart.getSeconds()).slice(-2);
                const timezoneOffsetStart = '-0300';

                const monthEnd = months[dateObjEnd.getMonth()];
                const dayOfWeekEnd = daysOfWeek[dateObjEnd.getDay()];
                const dayEnd = dateObjEnd.getDate();
                const yearEnd = dateObjEnd.getFullYear();
                const hourEnd = dateObjEnd.getHours() + 3;
                const minuteEnd = ('0' + dateObjEnd.getMinutes()).slice(-2);
                const secondEnd = ('0' + dateObjEnd.getSeconds()).slice(-2);
                const timezoneOffsetEnd = '-0300';

                const formattedDateStart = `${dayOfWeekStart} ${monthStart} ${dayStart} ${yearStart} ${hourStart}:${minuteStart}:${secondStart} GMT${timezoneOffsetStart >= 0 ? '+' : ''}${timezoneOffsetStart}:00 (Horário Padrão de Brasília)`;

                const formattedDateEnd = `${dayOfWeekEnd} ${monthEnd} ${dayEnd} ${yearEnd} ${hourEnd}:${minuteEnd}:${secondEnd} GMT${timezoneOffsetEnd >= 0 ? '+' : ''}${timezoneOffsetEnd}:00 (Horário Padrão de Brasília)`;

                return {
                    id: evento.id,
                    start: moment(convertToISODateString(formattedDateStart)).toDate(),
                    end: moment(convertToISODateString(formattedDateEnd)).toDate(),
                    title: evento.titulo
                }
            })

            console.log(data)
            console.log(dataMapped);
            setMyEvents(dataMapped);
            setAtualize(Math.random() * 99999)
        }
        fetchEventos();
        console.log(atualize2)
    }, [atualize2])

    const handleSelectEvent = useCallback(
        (event) => {
            setEventSelected(event);
            console.log(event);
            handleOpen14();
        },
        [setMyEvents]
    );


    const { defaultDate, scrollToTime, messages } = useMemo(
        () => ({
            defaultDate: new Date(),
            scrollToTime: new Date(2023, 0, 1),
            messages: {
                ...Views,
                today: 'Hoje',
                previous: 'Anterior',
                next: 'Próximo',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
                agenda: 'Agenda',
                date: 'Data',
                time: 'Hora',
                event: 'Evento',
                noEventsInRange: 'Não há eventos para as datas selecionadas.',
                showMore: (total) => `+${total} mais`,
            },
        }),
        []
    );

    const [rightToLeft, setRightToLeft] = useState(false);

    const { handleOpen10, open10, setStartDate, startDate, endDate, setEndDate } = React.useContext(BaereContext);

    const handleSelectSlot = useCallback(
        ({ start, end }, modalInfo) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            const dateStringStart = new Date(start).toISOString();
            const dateObjStart = new Date(dateStringStart);
            const dateStringEnd = new Date(end).toISOString();
            const dateObjEnd = new Date(dateStringEnd);

            const monthStart = months[dateObjStart.getMonth()];
            const dayOfWeekStart = daysOfWeek[dateObjStart.getDay()];
            const dayStart = dateObjStart.getDate();
            const yearStart = dateObjStart.getFullYear();
            const hourStart = dateObjStart.getUTCHours() - 3;
            const minuteStart = ('0' + dateObjStart.getUTCMinutes()).slice(-2);
            const secondStart = ('0' + dateObjStart.getUTCSeconds()).slice(-2);
            const timezoneOffsetStart = '-0300';

            const monthEnd = months[dateObjEnd.getMonth()];
            const dayOfWeekEnd = daysOfWeek[dateObjEnd.getDay()];
            const dayEnd = dateObjEnd.getDate();
            const yearEnd = dateObjEnd.getFullYear();
            const hourEnd = dateObjEnd.getUTCHours() - 3;
            const minuteEnd = ('0' + dateObjEnd.getUTCMinutes()).slice(-2);
            const secondEnd = ('0' + dateObjEnd.getUTCSeconds()).slice(-2);
            const timezoneOffsetEnd = '-0300';


            const formattedDateStart = `${dayOfWeekStart} ${monthStart} ${dayStart} ${yearStart} ${hourStart}:${minuteStart}:${secondStart
                } GMT${timezoneOffsetStart >= 0 ? '+' : ''}${timezoneOffsetStart}:00 (Horário Padrão de Brasília)`;

            const formattedDateEnd = `${dayOfWeekEnd} ${monthEnd} ${dayEnd} ${yearEnd} ${hourEnd}:${minuteEnd}:${secondEnd
                } GMT${timezoneOffsetEnd >= 0 ? '+' : ''}${timezoneOffsetEnd}:00 (Horário Padrão de Brasília)`;

            console.log(formattedDateStart)
            console.log(formattedDateEnd)
            setStartDate(moment(convertToISODateString(formattedDateStart)).toDate());
            setEndDate(moment(convertToISODateString(formattedDateEnd)).toDate());
            handleOpen10();
        },
        [myEvents]
    );

    return (
        <Fragment>
            <BasicModal10 setAtualize={setAtualize} setAtualize2={setAtualize2} setEvents={setMyEvents} handleSelectSlot={handleSelectSlot} />
            <BasicModal14 setAtualize={setAtualize} setAtualize2={setAtualize2} setEvents={setMyEvents} handleSelectSlot={handleSelectSlot} />
            <div style={{ height: '100vh' }}>
                <Calendar
                    dayLayoutAlgorithm={dayLayoutAlgorithm}
                    defaultDate={defaultDate}
                    defaultView={Views.MONTH}
                    events={myEvents}
                    localizer={localizer}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    culture="pt-br"
                    messages={messages}
                    scrollToTime={scrollToTime}
                    startAccessor="start"
                    endAccessor="end"
                    rtl={rightToLeft}
                />
            </div>
        </Fragment>
    );
}
