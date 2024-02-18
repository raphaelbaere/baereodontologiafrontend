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
    const { urlRequisicao, handleOpen14, setEventSelected } = React.useContext(BaereContext);

    useEffect(() => {
        const fetchEventos = async () => {
            const response = await fetch(`${urlRequisicao}/eventos`);
            const data = await response.json();
            const dataMapped = data.map((evento) => ({
            id: evento.id,
            start: evento.start_date,
            end: evento.end_date,
            title: evento.titulo
        }))
        setMyEvents(dataMapped);
            
        }
        fetchEventos();
    }, [myEvents])

    const handleSelectEvent = useCallback(
        (event) => {
            setEventSelected(event);
            console.log(event);
            handleOpen14();
        },
        []
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
            setStartDate(format(start.setDate(start.getDate() + 1), 'yyyy-MM-dd HH:mm:ss'));
            setEndDate(format(end.setDate(end.getDate() - 1), 'yyyy-MM-dd HH:mm:ss'));
            handleOpen10();
        },
        [myEvents]
    );

    useEffect(() => {

    }, [open10])

    return (
        <Fragment>
            <BasicModal10 setAtualize={setAtualize} setEvents={setMyEvents} handleSelectSlot={handleSelectSlot} />
            <BasicModal14 setAtualize={setAtualize} setEvents={setMyEvents} handleSelectSlot={handleSelectSlot} />
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
