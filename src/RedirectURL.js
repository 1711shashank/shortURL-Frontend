function RedirectURL(props) {
    const url = props.match.params.url;
    window.location.assign(`https://shorturlshashank.herokuapp.com/${url}`);
}

export default RedirectURL;