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
    const [newTime, setNewTime] = useState("");
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [adding, setAdding] = useState(false);
    const [currentTime, setCurrentTime] = useState(formatTime(true));


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatTime(true));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addToday = () => {
        setTimes({ ...times, [newTime || formatTime(false)]: { time: newTime || formatTime(false), patient: newName || "-", phone: newPhone || "-" } });
        setNewTime(""); setNewName(""); setNewPhone("");
        // dispatch(setToday());
    }

    const removeTime = () => {

    }

    return <div className="page" style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
        <div style={{ fontSize: "50px", lineHeight: "60px" }}>{currentTime}</div>
        {Object.values(times)?.length > 0 &&
            (Object.values(times).map(({ time, patient, phone }, i) =>
                <div key={i} style={{ display: "flex", alignItems: "center", flexFlow: "row", gap: "15px", width: "100%" }}>
                    <label htmlFor="today_time">Time</label>
                    <input id="today_time" type="text" value={time} readonly></input>
                    <label htmlFor="today_name">Name</label>
                    <input id="today_name" type="text" value={patient} readonly></input>
                    <label htmlFor="today_phone">Phone</label>
                    <input id="today_phone" type="text" value={phone} readonly></input>
                    <input type="button" style={{ backgroundColor: "lime", fontSize: "22px", lineHeight: "24px", paddingTop: "2px" }} value="✔" onClick={addToday} />
                    <input type="button" style={{ backgroundColor: "tomato", fontSize: "28px", lineHeight: "30px", paddingBottom: "4px" }} value="x" onClick={(e) => removeTime(e)} />
                </div>
            ))
        }
        <div className="spacer"></div>
        {adding && (
            <div style={{ display: "flex", alignItems: "center", flexFlow: "row", gap: "15px", width: "100%" }}>
                <label htmlFor="today_add_time">Time</label>
                <input id="today_add_time" type="text" value={newTime} placeholder={formatTime(false)} onChange={(e) => setNewTime(e.target.value)}></input>
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
