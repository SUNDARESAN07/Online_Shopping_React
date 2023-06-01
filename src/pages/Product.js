import React from 'react';
import SearchBar from './product/search-bar/SearchBar';
import ProductData from './product/Productdata';
import NavigateButton from '../components/NavigateButton';
import Fetch from '../common/useFetch';
import getToken from '../common/getToken';
import HTTP_REQUEST_LINK from '../common/Req_link';
import getAccess from '../common/getAccess';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            product: [],
            product1:[]
        };
    }
    componentDidMount() {
        var options = {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
        Fetch(HTTP_REQUEST_LINK+"all", options).then((data) => {
            console.log(data);
            this.setState({ product: data,product1:data,search:true })
        }).catch(err => {
            this.setState({
                product: []
            })
            if (err.message !== "") {
                this.setState({
                    search: false
                })
            }
        })
    }
    render() {
        var conStyle = {
            textAlign: 'center',
            alignSelf: 'center',
            padding: '40vh 70vh',
            margin: 'auto'
        }
        var SearchStyle = {
            width: "80%",
            paddingLeft: 50,
            margin: "2vw 10vw",
        }

        var header = {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",

            paddingTop: "1vw",
            textAlign: "center"
        }
        var buttonStyle = {
            display: "inline-flex",
        }
        var headStyle = {
            display: "inline-flex",
            textAlign: "center",
            margin: "0em 8em",
            paddingLeft: "2em"
        }

        const ProductDelete=(id,name)=>{ 
            Fetch(HTTP_REQUEST_LINK+name+"/delete/"+id, { method: 'DELETE' , headers: {
                "Authorization": "Bearer " + getToken(),
            } })
            .then((data)=>{
                if(data){
                    alert('Product deleted successfully');
                    window.location.reload(false);
                   
                }
                else{
                    alert('problem in deleting record');
                }
            }).catch(err => {
                this.setState({
                    product: []
                })
                if (err.message !== "") {
                    this.setState({
                        search: false
                    })
                }
            })
    }
        const sproducts = (data) => {
            if (data !== "") {
                const searchItems = this.state.product
                    .filter(p => p.productName.toLowerCase().includes(data.toLowerCase()));
                if (searchItems.length > 0) {
                    this.setState({
                        product: searchItems,
                        search: true
                    });
                }
                else {
                    this.setState({
                        search: false
                    })
                }
            } else {
                this.setState({
                    product:this.state.product1,
                    search: true
                });
            }
        }
        return (
            <div>
                <div style={header}>
                    <h1 style={headStyle}>PRODUCT DETAILS</h1>
                    {getAccess() ?
                        <NavigateButton buttonTitle={"Add Product"} buttonStyle={buttonStyle} variant={"success"} route={'/product/add'} isReplaced={false} /> : null}
                </div>
                <div style={SearchStyle}>
                    <SearchBar data={sproducts} />
                </div>

                {this.state.search ?
                    <ProductData products={this.state.product} user={getAccess()} deleteProduct={ProductDelete}/> :
                    <h1 style={conStyle}>No Product Found</h1>
                }
            </div>
        );
    }
}

export default Product;