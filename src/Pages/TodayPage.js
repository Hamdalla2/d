import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function TodayPage() {
    const formatTime = (includeSeconds = false) => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return includeSeconds ? `${hours} : ${minutes} : ${seconds}` : `${hours} : ${minutes}`;
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
    const [currentTime, setCurrentTime] = useState(formatTime(true));


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatTime(true));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addToday = () => {
        if (!times[addingTime || formatTime(false)]) {
            setTimes({ ...times, [addingTime || formatTime(false)]: { time: addingTime || formatTime(false), patient: addingPatient, phone: addingPhone } });
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

    return <div className="page" style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
        <div style={{ fontSize: "50px", lineHeight: "60px" }}>{currentTime}</div>
        {Object.values(times)?.length > 0 &&
            (Object.values(times).map(({ time, patient, phone }, i) =>
                <div key={i}>
                    <div className="spacer"></div>
                    <div style={{ display: "flex", alignItems: "center", flexFlow: "row", gap: "15px", width: "100%" }}>
                        <label htmlFor="today_time">Time</label>
                        <input id="today_time" type="text" onChange={(e) => setEditingTime(e.target.value)} value={editing === time ? editingTime || time : time} readOnly={editing !== time}></input>
                        <label htmlFor="today_patient">Patient</label>
                        <input id="today_patient" type="text" onChange={(e) => setEditingPatient(e.target.value)} value={editing === time ? editingPatient || patient || "-" : patient || "-"} readOnly={editing !== time}></input>
                        <label htmlFor="today_phone">Phone</label>
                        <input id="today_phone" type="number" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} onChange={(e) => setEditingPhone(e.target.value)} value={editing === time ? editingPhone || phone || "-" : phone || "-"} readOnly={editing !== time}></input>
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
                <input id="today_add_time" type="text" value={addingTime} placeholder={formatTime(false)} onChange={(e) => setAddingTime(e.target.value)}></input>
                <label htmlFor="today_add_patient">Patient</label>
                <input id="today_add_patient" type="text" value={addingPatient} placeholder="-" onChange={(e) => setAddingPatient(e.target.value)}></input>
                <label htmlFor="today_add_phone">Phone</label>
                <input id="today_add_phone" type="number" value={addingPhone} placeholder="-" onChange={(e) => setAddingPhone(e.target.value)}></input>
                <input type="button" style={{ backgroundColor: "lime", fontSize: "22px", lineHeight: "24px", paddingTop: "2px" }} value="✔" onClick={addToday} />
                <input type="button" style={{ backgroundColor: "tomato", fontSize: "28px", lineHeight: "30px", paddingBottom: "2px" }} value="x" onClick={() => setAdding(!adding)} />
            </div>
        )}
        {!adding && <input type="button" style={{ backgroundColor: "lime", fontSize: "32px", lineHeight: "34px" }} value="+" onClick={() => setAdding(!adding)} />}
    </div>;
}

export default TodayPage;
