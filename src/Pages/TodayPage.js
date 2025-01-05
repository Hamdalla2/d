import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function TodayPage() {
    const formatTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${hours} : ${minutes} : ${seconds}`;
    };

    const dispatch = useDispatch()
    const [times, setTimes] = useState({});
    const [newTime, setNewTime] = useState("");
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [adding, setAdding] = useState(false);
    const [currentTime, setCurrentTime] = useState(formatTime());


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addToday = () => {
        setTimes({ ...times, [newTime || currentTime]: { time: newTime || currentTime, patient: newName || "-", phone: newPhone || "-" } });
        // dispatch(setToday());
    }

    return <div className="page" style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
        <div style={{ fontSize: "50px", lineHeight: "60px" }}>{currentTime}</div>
        {times ??
            Object.keys(times).map(({ time, patient, phone }, i) => <div key={i}>{time} {patient} {phone}</div>)
        }
        <div className="spacer"></div>
        {adding && (
            <div style={{ display: "flex", alignItems: "center", flexFlow: "row", gap: "15px", width: "100%" }}>
                <label htmlFor="today_add_time">Time</label>
                <input id="today_add_time" type="text" value={newTime} placeholder="-" onChange={(e) => setNewTime(e.target.value)}></input>
                <label htmlFor="today_add_name">Name</label>
                <input id="today_add_time" type="text" value={newName} placeholder="-" onChange={(e) => setNewName(e.target.value)}></input>
                <label htmlFor="today_add_phone">Phone</label>
                <input id="today_add_phone" type="text" value={newPhone} placeholder="-" onChange={(e) => setNewPhone(e.target.value)}></input>
                <input type="button" style={{ backgroundColor: "lime", fontSize: "22px", lineHeight: "24px", paddingTop: "2px" }} value="✔" onClick={addToday} />
                <input type="button" style={{ backgroundColor: "tomato", fontSize: "28px", lineHeight: "30px", paddingBottom: "2px" }} value="x" onClick={() => setAdding(!adding)} />
            </div>
        )}
        {!adding && <input type="button" style={{ backgroundColor: "lime", fontSize: "32px", lineHeight: "34px" }} value="+" onClick={() => setAdding(!adding)} />}
    </div>;
}

export default TodayPage;
