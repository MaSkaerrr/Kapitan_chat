
import { useState,useRef,useEffect } from "react"
import { useAuth } from "../Provider/AuthProvider"

/**
 * Компонент для ввода сообщения
 * 
 * @param {Function} setlist - функция для обновления списка сообщений
 * @param {number} chatid - идентификатор чата
 * 
 * @returns {React.Component} - компонент для ввода сообщения
 */
export default function MessageInputArea({setlist,chatid}) {
    const {JWTaccessToken,BASE_WS_URL,userid} = useAuth();
    const [msg, setmsg] = useState("");
    const wsRef = useRef(null);

    /** соединение с вебсокетом */
    useEffect(() => {
    const ws = new WebSocket(`${BASE_WS_URL}ws/chat?token=${JWTaccessToken}`);
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      console.log("WS open");
      if (!userid) console.warn("user not found");
    });

    ws.addEventListener("message", (ev) => {

        
      try {
        const payload = JSON.parse(ev.data);
        if (payload.type === "message") {
            console.log("WS message", payload.data);
          setlist((list) => [...list, payload.data]);
        }
      } catch (e) {
        console.warn("bad WS message", e);
      }
    });


    ws.addEventListener("error", (e) => {
      console.error("WS error", e);
      const h1 = document.getElementById("status");
      if (h1) h1.textContent = "Error WS";
    });

    ws.addEventListener("close", () => console.log("WS close"));
    return () => ws.close();
  }, [BASE_WS_URL, JWTaccessToken]); 

  // отправка сообщения
  const send = (obj) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn("WS not ready");
      return;
    }
    ws.send(JSON.stringify(obj));
    console.log("send", obj);
  };



/**
 * Обработчик события отправки сообщения
 * 
 * @param {Event} e - событие отправки формы
 * 
 * @returns {void}
 * 
 * @throws {Error} - если возникла ошибка при отправке сообщения
 */
    function MessageHandler(e){
        e.preventDefault();
        try{
          send({
            type: 'message',
            data: {
                user_id: userid,
                chat_id: chatid,
                content: msg
            }
          })
          setmsg('');
        }
        catch(e){
            console.log(e);
        }
        
    }


    return(
        <>

        <div>
            <h1 id="status"></h1>
        </div>
        <div className="message-input-container">
                <div className="message-input-wrapper">
                    <button className="icon-btn"><i className="fas fa-paperclip"></i></button>
                    <label htmlFor="msg">Message:</label>
                    <input type="text" className="message-input" name="message" id="msg" placeholder="Write message..." 
                    value={msg} onChange={(e) => setmsg(e.target.value)}/>
                    <div className="input-actions">
                        <button className="icon-btn"><i className="far fa-smile"></i></button>
                        <button className="send-button" onClick={(e) => (MessageHandler(e))}><i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>

        </>
    )
}