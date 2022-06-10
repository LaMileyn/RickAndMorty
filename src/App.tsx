import React, {FC} from 'react';
import {Routes, Route} from "react-router-dom";
import {Container, Image, Row} from "react-bootstrap";
import MainLayout from "./components/MainLayout/MainLayout";
// photos for Background site
import backgroundTop from './files/photos/head.jpg'
import backCenter from './files/photos/bg.jpg'
import MainPage from "./pages/MainPage/MainPage";
import EpisodeDetailPage from "./pages/EpisodeDetailPage/EpisodeDetailPage";
import LocationPage from "./pages/LocationPage/LocationPage";
import CharacterPage from "./pages/CharacterPage/CharacterPage";


const App: FC = () => {
    return (
        <Container fluid>
            <Row>
                <Image src={backgroundTop} className='mx-0 px-0'/>
            </Row>
            <Row style={{
                background: `#1c0026 url(${backCenter})`,
                backgroundPosition: "center top",
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                minHeight: '100vh'
            }}>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        <Route index element={<MainPage/>}/>
                        <Route path="main" element={<MainPage/>}/>
                        <Route path="episode-info/:episodeId" element={<EpisodeDetailPage/>}/>
                        <Route path="character-info/:characterId" element={<CharacterPage/>}/>
                        <Route path="location-info/:locationId" element={<LocationPage />}/>
                        <Route path="*" element={<div>404 - страница не найдена</div>}/>
                    </Route>
                </Routes>
            </Row>
        </Container>
    );
}

export default App;
