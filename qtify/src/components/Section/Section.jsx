import React,{ useEffect, useState } from "react";
import  Card  from "../Card/Card";
import styles from "./Section.module.css";
import axios from "axios";
import { Grid } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";
import Carousel from "../Carousel/Carousel.jsx"; // Adjust the import path as necessary



const Section = () => {

    const [topAlbums, setTopAlbums] = useState([]);
    const [newAlbums, setNewAlbums] = useState([]);

    const [isTopCollapsed, setIsTopCollapsed] = useState(false);
    const [isNewCollapsed, setIsNewCollapsed] = useState(false);

    const performApiCall = async() => {
        // Placeholder for API call logic
        try {
            const [topAlbumsResponse, newAlbumsResponse] = await Promise.all([
                axios.get('https://qtify-backend-labs.crio.do/albums/top'),
                axios.get('https://qtify-backend-labs.crio.do/albums/new')
            ]);
            console.log(topAlbumsResponse.data);
            console.log(newAlbumsResponse.data);
            setTopAlbums(topAlbumsResponse.data);
            setNewAlbums(newAlbumsResponse.data);
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

    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <h3>Top Albums</h3>
                <h4 className={styles.toggleText} onClick={handleTopToggle}>
                    {isTopCollapsed ? "Collapse" : "Show all"}
                </h4>
            </div>

            { isTopCollapsed ? (
                <Grid container spacing={2}>
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

            <div className={styles.header}>
                <h3>New Albums</h3>
                <h4 className={styles.toggleText} onClick={handleNewToggle}>
                    {isNewCollapsed ? "Collapse" : "Show all"}
                </h4>
            </div>

            { isNewCollapsed ? (
                <Grid container spacing={3}>
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
        </div>
    );
};

export default Section;



