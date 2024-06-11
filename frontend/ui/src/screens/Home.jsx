import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header.jsx'
import Cards from '../components/Cards.jsx'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
export default function Home() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState({});
    const [priceRange, setPriceRange] = useState([100, 1000000]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const fetchproducts = async () => {
            const data = await axios.get("http://localhost:5001/api/v1/products/all");
            setProducts(data.data);

            const uniqueCategories = [...new Set(data.data.map(product => product.category))];
            setCategories(uniqueCategories);

        };
        fetchproducts();

        console.log(categories)
    }, [])
    const handleSliderChange = (value) => {
        setPriceRange(value);
    };
    const handleCategoryChange = (category) => {
        setSelectedCategories({
            ...selectedCategories,
            [category]: !selectedCategories[category]
        });
    }
    const handleSearch = async () => {
        try {
            const selectedCategoryNames = Object.keys(selectedCategories).filter(category => selectedCategories[category]);
            const response = await axios.get('http://localhost:5001/api/v1/products/search', {
                params: {
                    query: searchQuery,
                    categories: selectedCategoryNames.join(','),
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1]
                }
            });
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            alert("Error searching products:", error);
        }
    };
    return (
        <>

            <Header />
            <div className="container m-5">
                <Container className="my-4">
                    <Row className="mb-3">
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <div className="category-filters">
                                {categories.map(category => (
                                    <Form.Check
                                    key={category}
                                    type="checkbox"
                                    label={category}
                                    checked={selectedCategories[category]}
                                    onChange={() => handleCategoryChange(category)}
                                    />
                                ))}
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <div className="price-range-slider">
                                <label>Price Range:</label>
                                <Slider
                                    range
                                    min={0}
                                    max={1000000}
                                    value={priceRange}
                                    onChange={handleSliderChange}
                                />
                                <div>₹{priceRange[0]} - ₹{priceRange[1]}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Button variant="primary" onClick={handleSearch} >Search</Button>
                        </Col>
                    </Row>
                    <Row >
                        {products.map(d => (
                            <Col className="mb-2 mx-2" key={d._id} xs={12} sm={6} md={4} lg={3}>

                                <Cards product={d} />

                            </Col>
                        ))}
                    </Row>
                </Container>

            </div>
        </>
    )
}
