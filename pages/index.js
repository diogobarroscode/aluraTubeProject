import React from "react";
import config from "../config.json"
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";
import { videoService } from "../src/services/videoService";



function HomePage() {

    const service = videoService();

    const estilosDaHomePage = {
        //backgroundColor: "red"
    };

    //console.log(config.playlists);

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    //config.playlists
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);

                const novasPlaylists = {...playlists};
                dados.data.forEach((video) => {
                    if(!novasPlaylists[video.playlist]){
                        novasPlaylists[video.playlist] = [];
                    }
                    novasPlaylists[video.playlist].push(video);
                })
                setPlaylists(novasPlaylists);
            });
    }, []);


    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlists={playlists}>
                    Conteúdo
                </TimeLine>
            </div>
        </>
    );
}
  
export default HomePage
/*
function Menu() {
    return (
        <div>
            Menu
        </div>
    )
}
*/
const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    //background-image: url(${config.bg});
    background-image: url(${({ bg }) => bg });
    height: 230px;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function TimeLine({searchValue, ...props}) {
    //console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {
                playlistNames.map((playlistName) => {
                    const videos = props.playlists[playlistName];
                    //console.log(playlistName);
                    //console.log(videos);
                    return (
                        <section key={playlistName}>
                            <h2>{playlistName}</h2>
                            <div>
                                {videos.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                }).map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                            </div>
                        </section>
                    )
                })}
        </StyledTimeline>
    )
}