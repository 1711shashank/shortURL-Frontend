function RedirectURL(props) {
    const url = props.match.params.url;
    window.location.assign(`https://shortensurlbackend.herokuapp.com/${url}`);
}

export default RedirectURL;