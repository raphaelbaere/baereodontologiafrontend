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
                
                const dateStringStart = evento.start_date;
                const dateObjStart = new Date(dateStringStart);
                
                const dateStringEnd = evento.end_date;
                const dateObjEnd = new Date(dateStringEnd);

                const monthStart = months[dateObjStart.getUTCMonth() - 1];
                const dayOfWeekStart = daysOfWeek[dateObjStart.getUTCDay() + 2];
                let dayStart = dateObjStart.getUTCDate() + 17;
                const yearStart = dateObjStart.getUTCFullYear();
                let hourStart = ('0' + dateObjStart.getUTCHours()).slice(-2);
                console.log(hourStart, 'start')
                if (hourStart >= 15 && hourStart > 0) {
                    hourStart = ('0' + dateObjStart.getUTCHours()).slice(-2) - 15;
                } else if (hourStart == 0) {
                    hourStart = (dateObjStart.getUTCHours() + 9)
                    dayStart = dateObjStart.getUTCDate() + 16;
                } else if (hourStart >= 12 && hourStart < 15) {
                    hourStart = (dateObjStart.getUTCHours() + 9);
                    dayStart = dateObjStart.getUTCDate() + 17;
                } else if (hourStart > 0 && hourStart <= 15) {
                    hourStart = (dateObjStart.getUTCHours() + 9);
                    dayStart = dateObjStart.getUTCDate() + 16;
                }
                const minuteStart = ('0' + dateObjStart.getUTCMinutes()).slice(-2);
                const secondStart = ('0' + dateObjStart.getUTCSeconds()).slice(-2);
                const timezoneOffsetStart = '-0300';
                
                const monthEnd = months[dateObjEnd.getUTCMonth() - 1];
                const dayOfWeekEnd = daysOfWeek[dateObjEnd.getUTCDay() + 2];
                let dayEnd = dateObjEnd.getUTCDate() + 17;
                const yearEnd = dateObjEnd.getUTCFullYear();
                let hourEnd = ('0' + dateObjEnd.getUTCHours()).slice(-2);
                console.log(hourEnd, 'end');
                if (hourEnd >= 15 && hourEnd > 0) {
                    hourEnd = ('0' + dateObjEnd.getUTCHours()).slice(-2) - 15;
                    console.log(hourEnd, 'end')
                } else if (hourEnd == 0) {
                    hourEnd = (dateObjEnd.getUTCHours() + 9);
                    dayEnd = dateObjEnd.getUTCDate() + 16;
                    console.log(hourEnd, 'end')
                } else if (hourEnd >= 12 && hourEnd < 15) {
                    hourEnd = (dateObjEnd.getUTCHours() + 9);
                    dayEnd = dateObjEnd.getUTCDate() + 17;
                } else if (hourEnd > 0 && hourEnd <= 15) {
                    hourEnd = (dateObjEnd.getUTCHours() + 9);
                    dayEnd = dateObjEnd.getUTCDate() + 16;
                }
                const minuteEnd = ('0' + dateObjEnd.getUTCMinutes()).slice(-2);
                const secondEnd = ('0' + dateObjEnd.getUTCSeconds()).slice(-2);
                const timezoneOffsetEnd = '-0300';
                
                const formattedDateStart = `${dayOfWeekStart ? dayOfWeekStart : daysOfWeek[0]} ${monthStart} ${dayStart} ${yearStart} ${hourStart}:${minuteStart}:${secondStart} GMT${timezoneOffsetStart} (Horário Padrão de Brasília)`;
                
                const formattedDateEnd = `${dayOfWeekEnd ? dayOfWeekEnd : daysOfWeek[0]} ${monthEnd} ${dayEnd} ${yearEnd} ${hourEnd}:${minuteEnd}:${secondEnd} GMT${timezoneOffsetEnd} (Horário Padrão de Brasília)`;
                
                console.log(formattedDateStart);
                console.log(formattedDateEnd);
                return {
            id: evento.id,
            start: new Date(formattedDateStart),
            end: new Date(formattedDateEnd),
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
                const hourStart = dateObjStart.getUTCHours();
                const minuteStart = ('0' + dateObjStart.getUTCMinutes()).slice(-2);
                const secondStart = ('0' + dateObjStart.getUTCSeconds()).slice(-2);
                const timezoneOffsetStart = '-0300';
        
                const monthEnd = months[dateObjEnd.getMonth()];
                const dayOfWeekEnd = daysOfWeek[dateObjEnd.getDay()];
                const dayEnd = dateObjEnd.getDate();
                const yearEnd = dateObjEnd.getFullYear();
                const hourEnd = dateObjEnd.getUTCHours();
                const minuteEnd = ('0' + dateObjEnd.getUTCMinutes()).slice(-2);
                const secondEnd = ('0' + dateObjEnd.getUTCSeconds()).slice(-2);
                const timezoneOffsetEnd = '-0300';
        
        
                const formattedDateStart = `${dayOfWeekStart} ${monthStart} ${dayStart} ${yearStart} ${hourStart}:${minuteStart}:${secondStart
                } GMT${timezoneOffsetStart >= 0 ? '+' : ''}${timezoneOffsetStart}:00 (Horário Padrão de Brasília)`;
        
                const formattedDateEnd = `${dayOfWeekEnd} ${monthEnd} ${dayEnd} ${yearEnd} ${hourEnd}:${minuteEnd}:${secondEnd
                } GMT${timezoneOffsetEnd >= 0 ? '+' : ''}${timezoneOffsetEnd}:00 (Horário Padrão de Brasília)`;

                console.log(formattedDateStart)
                console.log(formattedDateEnd)
            setStartDate(new Date(formattedDateStart));
            setEndDate(new Date(formattedDateEnd));
            handleOpen10();
        },
        [myEvents]
    );

    return (
        <Fragment>
            <BasicModal10 setAtualize={setAtualize} setAtualize2={setAtualize2} setEvents={setMyEvents} handleSelectSlot={handleSelectSlot} />
            <BasicModal14 setAtualize={setAtualize} setAtualize2={setAtualize2} setEvents={setMyEvents} handleSelectSlot={handleSelectSlot} />
            <div style={{ height: '100vh'}}>
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
