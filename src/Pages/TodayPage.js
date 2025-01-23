import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function TodayPage() {
    const formatTime = (includeSeconds = false, now) => {
        if (!now) {
            return "";
        } else if (typeof now === "string") {
            now = now.toString().replace(/\s*:\s*/g, "")
            switch (now.length) {
                case 3:
                    return `${now[0] + now[1]} : ${now[2]}`
                case 4:
                    return `${now[0] + now[1]} : ${now[2] + now[3]}`
                default:
                    return now;
            }
        } else {
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            return includeSeconds ? `${hours} : ${minutes} : ${seconds}` : `${hours} : ${minutes}`;
        }
    };

    const dispatch = useDispatch()
    const [times, setTimes] = useState({});
    const [adding, setAdding] = useState(false);
    const [addingTime, setAddingTime] = useState("");
    const [addingPatient, setAddingPatient] = useState("");
    const [addingPhone, setAddingPhone] = useState("");
    const [editing, setEditing] = useState("");
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

    const addToday = () => {
        let addedTime = "";
        switch (addingTime.length) {
            case 1:
                addedTime = `0${addingTime} : 00`
                break;
            case 2:
                addedTime = `${addingTime} : 00`
                break;
            case 3:
                addedTime = `${addingTime[0] + addingTime[1]} : ${addingTime[2]}0`
                break;
            case 4:
                addedTime = `${addingTime[0] + addingTime[1]} : ${addingTime[2] + addingTime[3]}`
                break;
            default:
                addedTime = formatTime(false, new Date())
        }
        console.log(times)
        if (!times[addedTime]) {
            setTimes({ ...times, [addedTime]: { time: addedTime, patient: addingPatient, phone: addingPhone } });
            setAdding(false); setAddingTime(""); setAddingPatient(""); setAddingPhone("");
            // dispatch(setToday());
        }
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
        setEditing("")
        setEditingTime("")
        setEditingPatient("")
        setEditingPhone("")
    }

    const cancelEditing = () => {
        setEditing("")
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
        {Object.values(times)?.length > 0 &&
            (Object.values(times).map(({ time, patient, phone }, i) =>
                <div key={i}>
                    <div className="spacer"></div>
                    <div style={{ display: "flex", alignItems: "center", flexFlow: "row", gap: "15px", width: "100%" }}>
                        <label htmlFor="today_time">Time</label>
                        <input id="today_time" type="text" onChange={(e) => { setEditingTime(e.target.value.replace(/[^0-9]/g, '').slice(0, 4)) }} placeholder={formatTime(false, new Date())} value={editing === time ? formatTime(false, editingTime) || formatTime(false, time) : formatTime(false, time)} readOnly={editing !== time}></input>
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
            ))
        }
        <div className="spacer"></div>
        {adding && (
            <div style={{ display: "flex", alignItems: "center", flexFlow: "row", gap: "15px" }}>
                <label htmlFor="today_add_time">Time</label>
                <input id="today_add_time" type="text" value={formatTime(false, addingTime)} placeholder={formatTime(false, new Date())} onChange={(e) => { setAddingTime(e.target.value.replace(/[^0-9]/g, '').slice(0, 4)) }}></input>
                <label htmlFor="today_add_patient">Patient</label>
                <input id="today_add_patient" type="text" value={addingPatient} placeholder="-" onChange={(e) => setAddingPatient(e.target.value)}></input>
                <label htmlFor="today_add_phone">Phone</label>
                <input id="today_add_phone" type="text" value={addingPhone} placeholder="-" onChange={(e) => setAddingPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}></input>
                <input type="button" style={{ backgroundColor: "lime", fontSize: "22px", lineHeight: "24px", paddingTop: "2px" }} value="✔" onClick={addToday} />
                <input type="button" style={{ backgroundColor: "tomato", fontSize: "28px", lineHeight: "30px", paddingBottom: "2px" }} value="x" onClick={() => setAdding(!adding)} />
            </div>
        )}
        {!adding && <input type="button" style={{ backgroundColor: "lime", fontSize: "32px", lineHeight: "34px" }} value="+" onClick={() => setAdding(!adding)} />}
    </div>;
}

export default TodayPage;
