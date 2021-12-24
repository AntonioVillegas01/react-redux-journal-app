import React from 'react';
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes.action";
const { DateTime } = require("luxon");

const JournalEntry = ( { id, body, date, url, title } ) => {

    const luxonDate = DateTime.fromSeconds(date)
    const noteDate = luxonDate.toLocaleString(DateTime.DATETIME_MED);

    const dispatch =  useDispatch ()

    const handleEntryClick = (id, ) => {
        const note = {
            body,
            date,
            url,
            title
        }

        dispatch(activeNote(id,note))
    }

    return (
        <div className="journal__entry pointer animate__animated  animate__rotateInDownLeft"
             onClick={()=> handleEntryClick(id)}
        >
            {
                url
                    ? <div
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${url})`
                        }}
                    />
                    : <div
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png)`
                        }}
                    />
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{luxonDate.weekdayLong.toLocaleUpperCase()}</span>
                <h4>{luxonDate.day}</h4>
            </div>
        </div>
    );
};

export default JournalEntry;
