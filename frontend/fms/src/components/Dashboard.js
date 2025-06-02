import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Dashboard Component
const Dashboard = () => {
    const dashboardItems = [
        {
            label: 'Account',
            imgSrc: 'https://i.pinimg.com/736x/79/5b/66/795b668d9ff65cfc8c34c08c6bdda785.jpg',
        },
        {
            label: 'Budget',
            imgSrc: 'https://currentaffairs.adda247.com/wp-content/uploads/multisite/sites/5/2024/01/13150103/Budget.News_-1.png',
        },
        {
            label: 'Investment',
            imgSrc: 'https://static.vecteezy.com/system/resources/thumbnails/006/907/822/small_2x/panoramic-banner-background-of-business-success-concept-business-hand-showing-marketing-growth-strategy-graph-with-creative-graphic-chart-of-investment-finance-analysis-diagram-concept-free-photo.jpg',
        },
        {
            label: 'Savings',
            imgSrc: 'https://i.pinimg.com/736x/b3/c3/8e/b3c38ee6963b50f7a59e79ca33a531f5.jpg',
        },
        {
            label: 'Reports',
            imgSrc: 'https://i.pinimg.com/736x/bd/76/17/bd7617c1f3e8bc6b971a9474fa15ed75.jpg',
        },
        {
            label: 'Expenses',
            imgSrc: 'https://i.pinimg.com/736x/8e/7f/c7/8e7fc704c70d51c97ad92927e224f060.jpg',
        },
    ];

    // Slider settings for auto-rotation carousel
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Box sx={{ overflowX: 'hidden' }}>
            {/* Top Section with Text on Left and Image on Right */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                <Box sx={{ width: '50%', backgroundColor: '#f4f4f9', borderRadius: 2, boxShadow: 3, padding: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome, Manage Your Finance Here.
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your finances, investments, and savings efficiently. Explore your reports, 
                        set budgets, and track expenses all in one place. Take control of your financial future today.
                    </Typography>
                </Box>
                <Box sx={{ width: '45%' }}>
                    <img
                        src="https://www.techfunnel.com/wp-content/uploads/2018/05/Importance-of-Modern-Financial-Management-Systems.jpg"
                        alt="Dashboard Overview"
                        style={{ width: '100%', borderRadius: 10 }}
                    />
                </Box>
            </Box>

            {/* Carousel Section */}
            <Box sx={{ mt: 4 }}>
                <Slider {...sliderSettings}>
                    {dashboardItems.map((item, index) => (
                        <Box key={index} sx={{ px: 1 }}>
                            <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
                                <CardContent sx={{ textAlign: 'center', padding: 2 }}>
                                    <img
                                        src={item.imgSrc}
                                        alt={item.label}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                            borderRadius: 8,
                                        }}
                                    />
                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        {item.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Slider>
            </Box>

            {/* Footer Section */}
            <Box sx={{ textAlign: 'center', mt: 4, py: 2, backgroundColor: '#333', color: 'white' }}>
                <Typography variant="body2">
                    © 2025 Finance Management System. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
