import React from "react";
import {
  Card,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside>
      <Card>
        <CardTitle>DANH MỤC SẢN PHẨM</CardTitle>
        <CardBody>
          <ListGroup>
            <li style={{fontWeight: "bold"}}>KHUYẾN MẠI HOT</li>
            <li>Bột giặt, nước giặt</li>
            <li>Nước xả, nước tẩy</li>
            <li>Nước rửa chén</li>
            <li>Tẩy rửa nhà tắm</li>
            <li>Nước lau kính</li>
            <li>Nước lau nhà</li>
            <li>Xịt phòng, sáp thơm</li>
            <li>Bình xịt côn trùng</li>
            <li>Túi đựng rác</li>
          </ListGroup>
        </CardBody>
      </Card>
    </aside>
  );
};

export default Sidebar;
