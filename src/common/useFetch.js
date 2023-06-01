
const Fetch = (url, options ) => {
   const resdata=fetch(url, options)
        .then(async (response) => {
            console.log(response.status);
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            // check for error response
           
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                throw Promise.reject(error);
            }
            return data;
        });
    return resdata;
}

export default Fetch;