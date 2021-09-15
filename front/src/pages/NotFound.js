import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <center>
            
            <h1 style={{marginTop:200}}>404 - Page Not Found</h1>
            <Link to="/">Back to Site</Link>
        </center>
    )
}