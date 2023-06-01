import Form from 'react-bootstrap/Form';
import { BsSearch } from 'react-icons/bs'
import InputGroup from 'react-bootstrap/InputGroup';
import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import Fetch from '../../../common/useFetch';
import HTTP_REQUEST_LINK from '../../../common/Req_link';
import getToken from '../../../common/getToken';

function SearchBar(props) {
    const inputRef = useRef();
    const search = () => {
        const srchVal = inputRef.current.value;
        Fetch(HTTP_REQUEST_LINK+"products/search/" + srchVal, { headers: {"Authorization": "Bearer " + getToken(),}
        }).then(d => {
            console.log(d)
            props.data(srchVal)
        });
    }
    const handleChange = e => {
        props.data(e.target.value);
    }
    return (
        <div>
            <InputGroup className="mx-auto ">
                <InputGroup.Text id="basic-addon1"> <BsSearch /></InputGroup.Text>
                <Form.Control ref={inputRef} type="text" onChange={handleChange} name="search" size='20' placeholder="Enter Product Name" className="col-sm-8" />
                <Button size="sm" onClick={() => search()}>Search</Button>
            </InputGroup>
        </div>
    );

}

export default SearchBar;