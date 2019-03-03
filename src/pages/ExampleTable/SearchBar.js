import React from 'react';
import { Row, Col, Form, Button } from 'antd';

function SearchBar(props) {
  console.log('SearchBar update');
  const { formRender, onSearch, search, searchFields, operate } = props;
  return (
    <Form className="h-search-form">
      <Row>
        {searchFields.map((field, index) => (
          <Col span={6} key={index}>
            {formRender({ field, data: search })}
          </Col>
        ))}
        <div style={{ paddingTop: 2 }}>   
          <Button type="primary" onClick={onSearch}>搜索</Button>
          <Button className="ml-20" onClick={() => operate('add')}>新增用户</Button>
        </div>
      </Row>
    </Form>
  );
}

export default React.memo(SearchBar);