import { useEffect, useRef } from "react";
import LanguageSettings from "./ComponentPage/SettingsComp/languageSettings";
import ThemeSettings from "./ComponentPage/SettingsComp/themeSettings";
export default function SettingsList({isShow,children,setShow}) {

    const rootRef = useRef(null);

    useEffect(() => {
        const onPointerDown = e => {
            const el = rootRef.current;
            if(el && !el.contains(e.target)) {
                setShow(false);
            }
        }
        document.addEventListener('pointerdown', onPointerDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
        }
    },[isShow]);
    function show() {
     
        return (
            <div className={`settings settings-popover  ${isShow ? "open" : ""}`}>

                <LanguageSettings />
                <ThemeSettings />
            </div>
        );
    }
    return (
        <div ref={rootRef}>
            
            {children}
            <div style={
                {position:'relative',display:'inline-block',overflow:'visible' }
            }>
                {show()}
            </div>
            
        </div>
    );
}