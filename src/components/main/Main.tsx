import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import css from "./Main.module.scss";
import socket from "../../ConnectServer";

interface SocketMsg {
    name: string;
    mes: string;
}

export default function Main() {
    const [textInput, setTextInput] = useState("");
    const [message, setMessage] = useState<SocketMsg[]>([]);
    const [name, setname] = useState("");
    const ref = useRef<HTMLDivElement>(null);

    const sendMessage = useCallback(() => {
        textInput && socket.emit("foo", textInput);

        setTextInput("");
    }, [textInput]);
    useMemo(() => {
        socket.on("mess", (mess: SocketMsg) => {
            console.log(mess);

            setMessage((prev) => [...prev, mess]);
        });
        socket.on("name", (name: string) => {
            setname(name);
        });
    }, []);
    useEffect(() => {
        ref.current?.scrollTo(0, 9999);
    }, [message.length]);

    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <div className={css.chat} ref={ref}>
                    {message?.map((el, i) => (
                        <div
                            key={i}
                            className={el.name === name ? css.my : css.enemy}
                        >
                            {el.mes}
                        </div>
                    ))}
                </div>
                <div className={css.send}>
                    <input
                        className={css.input}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                    ></input>
                    <button className={css.button} onClick={sendMessage}>
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    );
}
