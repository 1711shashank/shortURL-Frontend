function RedirectURL(props) {
    const url = props.match.params.url;

window.location.assign(`http://localhost:5000/${url}`);

   

}

export default RedirectURL;