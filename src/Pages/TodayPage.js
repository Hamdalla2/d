import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const formatTime = (includeSeconds = false, time, editable = false) => {
    if (!time) {
        return "";
    } else if (typeof time === "string") {
        time = time.toString().replace(/\s*:\s*/g, "")
        if (time[0] > 2) { time = "2" + time.slice(1) }
        if (time[0] + time[1] > 23) { time = "23" + time.slice(2) }
        if (time[2] > 5) { time = time.slice(0, 2) + "5" + time.slice(3) }
        switch (time.length) {
            case 1:
                return editable ? time : `0${time} : 00`
            case 2:
                return editable ? time : `${time} : 00`
            case 3:
                return editable ? `${time[0] + time[1]} : ${time[2]}` : `${time[0] + time[1]} : ${time[2]}0`
            default:
                return `${time[0] + time[1]} : ${time[2] + time[3]}`
        }
    } else {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        return includeSeconds ? `${hours} : ${minutes} : ${seconds}` : `${hours} : ${minutes}`;
    }
};

function TodayPage() {

    const dispatch = useDispatch()
    const [times, setTimes] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editingTime, setEditingTime] = useState("");
    const [editingPatient, setEditingPatient] = useState("");
    const [editingPhone, setEditingPhone] = useState("");
    const [currentTime, setCurrentTime] = useState(formatTime(true, new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatTime(true, new Date()));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addTime = () => {
        setTimes([...times, { id: (times[times.length - 1]?.id || 0) + 1, time: "-", patient: "-", phone: "-", editing: true }])
    }

    const deleteTime = (time) => {
        for (const t in times) {
            if (times[t].time === time) { delete times[t] }
        }
    }

    const startEditing = (time) => {
        setEditing(time)
        setEditingTime(times[time]?.time)
        setEditingPatient(times[time]?.patient)
        setEditingPhone(times[time]?.phone)
    }

    const saveEditing = (time) => {
        for (const t in times) {
            if (times[t].time === time) { delete times[t] }
            times[editingTime] = { time: editingTime, patient: editingPatient, phone: editingPhone }
        }
        setEditing(null)
        setEditingTime("")
        setEditingPatient("")
        setEditingPhone("")
    }

    const cancelEditing = () => {
        setEditing(null)
        setEditingTime("")
        setEditingPatient("")
        setEditingPhone("")
    }

    const formateNumber = (e, type) => {
        e.target.value.replace(/[^0-9]/g, '')

        if (type === "time") { return }
    }

    return <div className="page" style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
        <div style={{ fontSize: "50px", lineHeight: "60px" }}>{currentTime}</div>
        {times.map(({ id, time, patient, phone, editing }, i) =>
            <div key={id}>
                <div className="spacer"></div>
                <div style={{ display: "flex", alignItems: "center", flexFlow: "row", gap: "15px", width: "100%" }}>
                    <label htmlFor="today_time">Time</label>
                    <input id="today_time" type="text" onChange={(e) => { setEditingTime(e.target.value.replace(/[^0-9]/g, '').slice(0, 4)) }} placeholder="-" value={editing === time ? formatTime(false, editingTime, true) : formatTime(false, time)} readOnly={editing !== time}></input>
                    <label htmlFor="today_patient">Patient</label>
                    <input id="today_patient" type="text" placeholder="-" onChange={(e) => setEditingPatient(e.target.value)} value={editing === time ? editingPatient || patient : patient || "-"} readOnly={editing !== time}></input>
                    <label htmlFor="today_phone">Phone</label>
                    <input id="today_phone" type="text" placeholder="-" onKeyDown={(e) => formateNumber(e, "phone")} onChange={(e) => setEditingPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} value={editing === time ? editingPhone || phone : phone || "-"} readOnly={editing !== time}></input>
                    {editing !== time ?
                        (<>
                            <input type="button" style={{ backgroundColor: "lime", fontSize: "22px", lineHeight: "24px", paddingTop: "2px" }} value="🖉" onClick={() => startEditing(time)} />
                            <input type="button" style={{ backgroundColor: "tomato", fontSize: "28px", lineHeight: "30px", paddingBottom: "4px" }} value="🗑" onClick={() => deleteTime(time)} />
                        </>
                        ) :
                        (<>
                            <input type="button" style={{ backgroundColor: "lime", fontSize: "22px", lineHeight: "24px", paddingTop: "2px" }} value="✔" onClick={() => saveEditing(time)} />
                            <input type="button" style={{ backgroundColor: "tomato", fontSize: "28px", lineHeight: "30px", paddingBottom: "2px" }} value="x" onClick={() => cancelEditing()} />
                        </>
                        )}
                </div>
            </div>
        )}
        <div className="spacer"></div>
        <input type="button" style={{ backgroundColor: "lime", fontSize: "32px", lineHeight: "34px" }} value="+" onClick={() => addTime()} />
    </div>;
}

export default TodayPage;
