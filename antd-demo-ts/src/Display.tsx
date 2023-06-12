import axios from 'axios';
import { useState, useEffect } from 'react';
import {List, Select} from 'antd';

interface Reference {
  type: {
    id: string;
    prefix: string;
  };
  number: number;
  text: string;
}

interface Location {
  id: string;
  name: string;
}

interface Theme {
  id: string;
  name: string;
}

interface Currency {
  id: string;
  symbol: string;
}

interface Price {
  currency: Currency;
  amount: number;
  text: string;
}

interface Status {
  id: string;
  name: string;
}

interface Item {
  id: string;
  reference: Reference;
  name: string;
  location: Location | null;
  theme: Theme | null;
  price: Price | null;
  status: Status | null;
}

function Display() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://n3o-coding-task-react.azurewebsites.net/api/v1/donationItems/all')
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterStatus = (value: string | null) => {
    setSelectedStatus(value);
    }

  const filteredItems = selectedStatus
    ? items.filter((item) => item.status?.name === selectedStatus)
    : items;

  return (
    <div>
        <div className='buttonPosition'>
            <Select 
            placeholder="Select Status Filter" 
            onChange={filterStatus}
            value={selectedStatus}
            >
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="notactive">Not Active</Select.Option>
            </Select>
        </div>

      {Array.isArray(items) && items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <List>
              <h2>{item.name}</h2>
              <p>Reference: {item.reference ? item.reference.type.id + ' ' + item.reference.type.prefix : 'N/A'}</p>
              <p>Price: {item.price ? `£${item.price.amount} ${item.price.currency.symbol}` : 'N/A'}</p>
              <p>Status: {item.status ? item.status.name : 'N/A'}</p>
              <p>Location: {item.location ? item.location.name : 'N/A'}</p>
              <p>Theme: {item.theme ? item.theme.name : 'N/A'}</p>
            </List>
          ))}
        </ul>
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
}

export default Display;
