import githubImg from '../images/github.png';

const Footer = () => {

    return (
       <div className="footer">
            <div className="credits-div">
                <a href="https://www.flaticon.com/" target='_blank' rel='noreferrer'>Icons from Flaticon</a>
            </div>

            <div className="github-div">
                <a href="https://github.com/RShillgit/Blog-Api" target='_blank' rel='noreferrer'>
                    <img id='githubImg' src={githubImg} alt='Github'></img>
                </a>
            </div>
       </div>
    )

}
export default Footer;