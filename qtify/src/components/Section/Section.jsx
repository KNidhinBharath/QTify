import React,{ useEffect, useState } from "react";
import  Card  from "../Card/Card";
import styles from "./Section.module.css";
import axios from "axios";
import Carousel from "../Carousel/Carousel.jsx"; // Adjust the import path as necessary
import { Tabs, Tab, Box, Grid } from "@mui/material";


const Section = () => {

    const [topAlbums, setTopAlbums] = useState([]);
    const [newAlbums, setNewAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");

    const filteredSongs =
        selectedGenre === "All"
        ? songs
        : songs.filter((song) => song.genre.label === selectedGenre);

    const [isTopCollapsed, setIsTopCollapsed] = useState(false);
    const [isNewCollapsed, setIsNewCollapsed] = useState(false);

   

    const performApiCall = async() => {
        // Placeholder for API call logic
        try {
            const [topAlbumsResponse, newAlbumsResponse, songsResponse, genresResponse] = await Promise.all([
                axios.get('https://qtify-backend-labs.crio.do/albums/top'),
                axios.get('https://qtify-backend-labs.crio.do/albums/new'),
                axios.get('https://qtify-backend-labs.crio.do/songs'),
                axios.get('https://qtify-backend-labs.crio.do/genres'),
            ]);
            
            // console.log(topAlbumsResponse.data);
            // console.log(newAlbumsResponse.data);
            // console.log(songsResponse.data);
            // console.log(genresResponse.data);
            setTopAlbums(topAlbumsResponse.data);
            setNewAlbums(newAlbumsResponse.data);
            setSongs(songsResponse.data);
            setGenres(["All", ...genresResponse.data.data.map((g) => g.label)]);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Call the API when the component mounts
    useEffect(() => {
        performApiCall();
    }, []);

    const handleTopToggle = () => {
        setIsTopCollapsed((prev) => !prev);
    }

    const handleNewToggle = () => {
        setIsNewCollapsed((prev) => !prev);
    }

    const handleTabChange = (event, newValue) => {
        setSelectedGenre(newValue);
    } 

    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <h3>Top Albums</h3>
                <h4 className={styles.toggleText} onClick={handleTopToggle}>
                    {isTopCollapsed ? "Collapse" : "Show all"}
                </h4>
            </div>
            
            { isTopCollapsed ? (
                <Grid container spacing={2} className={styles.wrapper}>
                    {topAlbums.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card
                                title={item.title}
                                follows={item.follows}
                                image={item.image}
                        />
                    </Grid>
                ))}
                </Grid> 
            ):(
                <Carousel 
                    data={topAlbums}
                    renderComponent={(item) => (
                        <Card
                            title={item.title}
                            follows={item.follows}
                            image={item.image}
                        />
                    )}
                />
            )}
            <br />
            <div className={styles.header}>
                <h3>New Albums</h3>
                <h4 className={styles.toggleText} onClick={handleNewToggle}>
                    {isNewCollapsed ? "Collapse" : "Show all"}
                </h4>
            </div>
            
            { isNewCollapsed ? (
                <Grid container spacing={2} className={styles.wrapper}>
                    {newAlbums.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card
                                title={item.title}
                                follows={item.follows}
                                image={item.image}
                            />
                        </Grid>
                    ))}
                </Grid>
            ):(
                <Carousel
                    data={newAlbums}
                    renderComponent={(item) => (
                        <Card
                            title={item.title}
                            follows={item.follows}
                            image={item.image}
                        />
                    )}
                />
            )}
            <br />
            <hr />
            <br />
            <div className={styles.header}>   
                <h3>Songs</h3>  
            </div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={selectedGenre}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            color: 'var(--color-white)'
                        },
                        '& .Mui-selected': {
                            color: '#34c94b',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#34c94b',
                        },
                        }}
                    >
                        {genres.map((genre) => (
                        <Tab key={genre} label={genre} value={genre} />
                        ))}
                    </Tabs>
                </Box>

                <Carousel
                    data={filteredSongs}
                    renderComponent={(item) => (
                        <Card
                        title={item.title}
                        follows={item.likes} // Pass likes instead of follows
                        image={item.image}
                        type="song" // Mark this as a song card
                        />
                    )}
                />

        </div>
    );
};

export default Section;



