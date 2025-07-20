import React,{ useEffect, useState } from "react";
import { Card } from "../Card/Card";
import styles from "./Section.module.css";
import axios from "axios";
import { Grid } from "@mui/material";
import { responsiveFontSizes } from "@mui/material";


const Section = () => {

    const [data, setData] = useState([]);

    const performApiCall = async() => {
        // Placeholder for API call logic
        try {
            const response = await axios.get('https://qtify-backend-labs.crio.do/albums/top');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Call the API when the component mounts
    useEffect(() => {
        performApiCall();
    }, []);

    const handleToggle = () => {
    }

    return (
        <div className={styles.section}>
            <div className={styles.header}>
                <h3>Top Albums</h3>
                <h4 className={styles.toggleText} onClick={handleToggle}>Collapse</h4>
            </div>
            
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card
                            title={item.title}
                            follows={item.follows}
                            image={item.image}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Section;

