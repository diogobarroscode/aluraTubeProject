import React from "react";
import config from "../config.json"
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://gbdmaqjxzyehjkmbmrqn.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZG1hcWp4enllaGprbWJtcnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0ODczNTMsImV4cCI6MTk4OTA2MzM1M30.T1fMr1LcYjVioKAWp9H8GnwbmhG2fgtdJWEdlN9Gcjk";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {

    const estilosDaHomePage = {
        //backgroundColor: "red"
    };

    //console.log(config.playlists);

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    //config.playlists
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        console.log("useEffect");
        supabase.from("video")
                .select("*")
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