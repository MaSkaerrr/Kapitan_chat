import axios from "axios";
import { useState,useEffect } from "react";
export default function LanguageSettings() {


    const [userid, setUserid] = useState(2);
    const URL = `http://127.0.0.1:8000/settings_api/UserSettings/${userid}/`;
    function getLanguageSettings(url = URL) {
        return axios.get(url).then((res) => {
            console.log(res.data);
            return res.data;
        })
    }
    function putLanguageSettings(url = URL){
        return axios.put(url,{user:userid,language:lang}).then((res)=>{
            console.log(res.data);
            return res.data;
        })
    }

    const [lang, setLang] = useState('');
    
    const [langChoiceList, setLangChoiceList] = useState([]);
    const [local, setLocal] = useState({});


    useEffect(() => {
        getLanguageSettings().then((res) => {
            setLang(res.language);
            setLocal(res.locale);
            setUserid(res.user);
        });
    }, []);

    useEffect(() => {
        getLanguageSettings().then((res) => {
            setLangChoiceList(res.language_choices);
        });
    }, []);


    useEffect(() => {
        putLanguageSettings().then((res) => {
            console.log('put')
            console.log(res);
        });
    })





    return (
        <>
        <div>
            <img srcSet="https://www.svgrepo.com/show/327318/language.svg" alt="lang icon" width="50px"  />
            <select name="" id="" onChange={(e) => setLang(e.target.value)}>
                {langChoiceList.map((item) => {
                    return <option key={item}  value={item}>{item}</option>;
                })}
            </select>
            <p>{lang}</p>

            
            
        </div>
        <p>{local.title}</p>
        </>
        
    );
}