
import { useAuth } from "../../Provider/AuthProvider";
export default function LanguageSettings() {


   const { settingparams, setSettingparams,langChoiceList } = useAuth();
   console.log(settingparams);

    return (
        <>
        <div className="chat-item  m-1 ">
            <img srcSet="https://www.svgrepo.com/show/327318/language.svg" alt="lang icon" width="50px"  />
            <select name="" id=""defaultValue={settingparams.language} onChange={(e) => setSettingparams({...settingparams,language:e.target.value})}>
                {langChoiceList.map((item) => {
                    return <option key={item}  value={item}>{item}</option>;
                })}
            </select>
            <p>{settingparams.language}</p>

        </div>
        </>
        
    );
}