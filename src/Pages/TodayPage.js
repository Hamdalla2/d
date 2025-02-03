import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const formatTime = ({ time, includeSeconds = false, editable = false }) => {
  if (!time) { return "" }
  if (typeof time === "string") {
    time = time.replace(/\s*:\s*/g, "").replace(/^(.)(.)(.)/, (_, h1, h2, m) => `${Math.min(h1, 2)}${Math.min(h1 + h2 > 23 ? 3 : h2, 9)}${Math.min(m, 5)}`);
    switch (time.length) {
      case 1: return editable ? time : `0${time} : 00`
      case 2: return editable ? time : `${time} : 00`
      case 3: return editable ? `${time[0] + time[1]} : ${time[2]}` : `${time[0] + time[1]} : ${time[2]}0`
      default: return `${time[0] + time[1]} : ${time[2] + time[3]}`
    }
  }
  else {
    const hours = time.getHours().toString().padStart(2, "0")
    const minutes = time.getMinutes().toString().padStart(2, "0")
    const seconds = time.getSeconds().toString().padStart(2, "0")
    return includeSeconds ? `${hours} : ${minutes} : ${seconds}` : `${hours} : ${minutes}`
  }
}

function TodayPage() {
  const dispatch = useDispatch()
  const [times, setTimes] = useState([]);
  const [editingId, setEditingId] = useState(0);
  const [editingTime, setEditingTime] = useState("");
  const [editingPatient, setEditingPatient] = useState("");
  const [editingPhone, setEditingPhone] = useState("");
  const [currentTime, setCurrentTime] = useState(formatTime(true, new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatTime({ time: new Date(), includeSeconds: true }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleEditing = (id) => { setEditingId(id); setEditingTime(""); setEditingPatient(""); setEditingPhone("") }
  const addTime = () => { setTimes([...times, { id: (times[times.length - 1]?.id || 0) + 1, time: "", patient: "", phone: "" }]); toggleEditing((times[times.length - 1]?.id || 0) + 1) }
  const deleteTime = (id) => { setTimes(prevItems => prevItems.filter((item) => item[id] !== id)) }
  const saveEditing = (id) => { setTimes(prevItems => prevItems.map((item) => (item[id] === id ? (item[id] = { id: item[id], time: editingTime, patient: editingPatient, phone: editingPatient }, toggleEditing(0)) : item))) }
  console.log(times, editingId)
  return (
    <div className="page" style={{ display: "flex", alignItems: "center", flexFlow: "column" }}    >
      <div style={{ fontSize: "50px", lineHeight: "60px" }}>{currentTime}</div>
      {times.map(({ id, time, patient, phone }, i) => (
        <div key={id}>
          <div className="spacer"></div>
          <div style={{ display: "flex", alignItems: "center", flexFlow: "row", gap: "15px", width: "100%", }}>
            <label>Time</label>
            <input type="text" placeholder="00 : 00" onChange={(e) => { setEditingTime(e.target.value.replace(/[^0-9]/g, '').slice(0, 4)) }} value={formatTime({ time: editingTime || time, editable: editingId !== id })} readOnly={editingId !== id} />
            <label>Patient</label>
            <input type="text" placeholder="-" onChange={(e) => setEditingPatient(e.target.value)} value={editingPatient || patient} readOnly={editingId !== id} />
            <label>Phone</label>
            <input type="text" placeholder="-" onChange={(e) => setEditingPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))} value={editingPhone || phone} readOnly={editingId !== id} />
            <input type="button" style={{ backgroundColor: "lime", fontSize: "22px", lineHeight: "24px", paddingTop: "2px" }} value={editingId === id ? "✔" : "🖉"} onClick={() => editingId === id ? saveEditing(id) : toggleEditing(id)} />
            <input type="button" style={{ backgroundColor: "tomato", fontSize: "28px", lineHeight: "30px", paddingBottom: "4px" }} value={editingId === id ? "X" : "🗑"} onClick={() => editingId === id ? toggleEditing(0) : deleteTime(id)} />
          </div>
        </div>
      ))}
      <div className="spacer"></div>
      <input type="button" style={{ backgroundColor: "lime", fontSize: "32px", lineHeight: "34px", }} value="+" onClick={() => addTime()} />
    </div>
  )
}

export default TodayPage
