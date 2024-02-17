import React, { useCallback, useState, useMemo, Fragment, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/dist/locale/pt-br';
import BasicModal10 from '../../components/Modal10';
import { BaereContext } from '../../context/BaereProvider';

moment.locale('pt-br');

const localizer = momentLocalizer(moment);

export default function Agenda(props, {
    dayLayoutAlgorithm = 'no-overlap',
}) {
    const { setAtualize } = props;
    const [myEvents, setEvents] = useState([]);

    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
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

    const { handleOpen10, open10 } = React.useContext(BaereContext);

    const handleSelectSlot = useCallback(
        ({ start, end }, modalInfo) => {
            handleOpen10();
        },
        [setEvents]
    );

    useEffect(() => {

    }, [open10])

    return (
        <Fragment>
            <BasicModal10 setAtualize={setAtualize} setEvents={setEvents} handleSelectSlot={handleSelectSlot} />
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
