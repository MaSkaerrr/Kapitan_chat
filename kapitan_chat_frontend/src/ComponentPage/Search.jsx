import { useEffect,useState } from "react";
import ChatList from "./ChatList";

export default function Search({chatList = []}) {

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    function searching(){
        if (search.length <2) return []

        let result =  chatList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
        
        return result;
    }

    useEffect(() => {
        setSearchResult(searching());
    }, [search]);

    console.log(searchResult);
    return (
        <div className="search-conteiner" style={{ position: "relative", width: 320 }}>
        
        <div className="search-bar" style={{alignItems:'center', display:'flex'}}>
            <input  type="text" className="form-control message-input" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="button" className="btn btn-primary search search-icon"><i className="fas fa-search"></i></button>
        </div>
        
        {
            searchResult.length > 0 &&
                (
                    <div style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,                 // ширина равна поиску
            background: "#cac8c8ff",
            border: "1px solid #333",
            borderRadius: 8,
            maxHeight: 460,
            overflow: "auto",
            zIndex: 1000,
            padding: 8,
            alignItems: "center",
            }}>
                        
                        <ChatList chatList={searchResult}/>
                    </div>
                )
            
        }
        
        </div>
    );
}