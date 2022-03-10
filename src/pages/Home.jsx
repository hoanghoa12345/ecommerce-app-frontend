import React from "react";
import { Col, Container, Row } from "reactstrap";
import Product from "../components/product/Product";
const Home = () => {
  const products = [
    {
      id: 1,
      slug: "/bot-giat/bot-giat-ariel-huong-nang-mai-55kg",
      image:
        "https://cdn.tgdd.vn/Products/Images/2463/196448/bhx/bot-giat-ariel-huong-nang-mai-55kg-202203042240212822_300x300.jpg",
      name: "Bột giặt Ariel hương nắng mai 5.5kg",
      price: "173.000",
      old_price: "246.000",
      discount: 30,
    },
    {
      id: 2,
      slug: "bot-giat-ariel-huong-nang-mai-55kg",
      image:
        "https://cdn.tgdd.vn/Products/Images/2463/196448/bhx/bot-giat-ariel-huong-nang-mai-55kg-202203042240212822_300x300.jpg",
      name: "Bột giặt Ariel hương nắng mai 5.5kg",
      price: "173.000",
      old_price: "246.000",
      discount: 30,
    },
    {
      id: 3,
      slug: "bot-giat-attack-khu-mui-huong-hoa-anh-dao-38kg",
      image:
        "https://cdn.tgdd.vn/Products/Images/2463/96031/bhx/bot-giat-attack-khu-mui-huong-anh-dao-38kg-202203031424536805_300x300.jpg",
      name: "Bột giặt Attack khử mùi hương anh đào 3.8kg",
      price: "177.000",
      old_price: "186.000",
      discount: 5,
    },
    {
      id: 4,
      slug: "bot-giat-attack-khu-mui-huong-hoa-anh-dao-38kg",
      image:
        "https://cdn.tgdd.vn/Products/Images/2463/96031/bhx/bot-giat-attack-khu-mui-huong-anh-dao-38kg-202203031424536805_300x300.jpg",
      name: "Bột giặt Attack khử mùi hương anh đào 3.8kg",
      price: "177.000",
      old_price: "186.000",
      discount: 5,
    },
    {
      id: 5,
      slug: "bot-giat-attack-khu-mui-huong-hoa-anh-dao-38kg",
      image:
        "https://cdn.tgdd.vn/Products/Images/2463/96031/bhx/bot-giat-attack-khu-mui-huong-anh-dao-38kg-202203031424536805_300x300.jpg",
      name: "Bột giặt Attack khử mùi hương anh đào 3.8kg",
      price: "177.000",
      old_price: "186.000",
      discount: 5,
    },
    {
      id: 6,
      slug: "bot-giat-attack-khu-mui-huong-hoa-anh-dao-38kg",
      image:
        "https://cdn.tgdd.vn/Products/Images/2463/96031/bhx/bot-giat-attack-khu-mui-huong-anh-dao-38kg-202203031424536805_300x300.jpg",
      name: "Bột giặt Attack khử mùi hương anh đào 3.8kg",
      price: "177.000",
      old_price: "186.000",
      discount: 5,
    },
    {
      id: 7,
      slug: "bot-giat-attack-khu-mui-huong-hoa-anh-dao-38kg",
      image:
        "https://cdn.tgdd.vn/Products/Images/2463/96031/bhx/bot-giat-attack-khu-mui-huong-anh-dao-38kg-202203031424536805_300x300.jpg",
      name: "Bột giặt Attack khử mùi hương anh đào 3.8kg",
      price: "177.000",
      old_price: "186.000",
      discount: 5,
    },
    {
      id: 8,
      slug: "bot-giat-attack-khu-mui-huong-hoa-anh-dao-38kg",
      image:
        "https://cdn.tgdd.vn/Products/Images/2463/96031/bhx/bot-giat-attack-khu-mui-huong-anh-dao-38kg-202203031424536805_300x300.jpg",
      name: "Bột giặt Attack khử mùi hương anh đào 3.8kg",
      price: "177.000",
      old_price: "186.000",
      discount: 5,
    },
  ];
  return (
    <Container className="mt-2">
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={3} sm={12}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
