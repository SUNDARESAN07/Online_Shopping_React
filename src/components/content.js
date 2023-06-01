import { Outlet } from 'react-router-dom';
import './content.css'
function Content() {
    return (
        <div className='body'>
            <Outlet />
        </div>
    );
}

export default Content;