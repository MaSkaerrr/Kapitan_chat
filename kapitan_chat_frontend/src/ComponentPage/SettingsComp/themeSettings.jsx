import { useAuth } from "../../Provider/AuthProvider";

const DAY = "/img/day-mode.png";
const NIGHT = "/img/night-mode.png";

export default function ThemeSettings() {
  const { settingparams, setSettingparams } = useAuth();
  const theme = !!settingparams?.theme;

  return (
    <div className="chat-item m-1" style={{display:'flex',gap:8,alignItems:'center'}}>
      <div className="theme-img">
        <img src={DAY}  className={theme ? "show" : "hide"} alt="" />
        <img src={NIGHT} className={theme ? "hide" : "show"} alt="" />
      </div>

      <input
        type="range"
        min={0}
        max={1}
        step={1}
        value={theme ? 1 : 0}
        onChange={e => {
          const v = Number(e.target.value);
          setSettingparams(p => ({ ...p, theme: v === 1 }));
        }}
        style={{ width: "50%" }}
      />

      
    </div>
  );
}