import "./style.css";
import "./../style.css"

function NotFound(){
    return (
        <div className="px-2 d-flex justify-content-center align-items-center notFound content">
            <img src='https://www.pngitem.com/pimgs/m/51-511432_sadness-crying-sadness-inside-out-characters-hd-png.png'></img>
            <div className="text-center">
                <p>Awww...Don't Cry</p>
                <p className="border border-3 border-warning p-2">It's just a 404 Error!</p>
                <p>The requested URL was not found on this server. That’s all we know.</p>
            </div>     
        </div>
    )
}

export default NotFound;