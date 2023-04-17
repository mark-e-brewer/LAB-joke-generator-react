import React, { useState } from 'react';

export default function TestForm() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    age: 0,
    customerCards: [],
  });

  const handleSubmit = (e) => {
    e.preventDefualt();

    const customerCard = (
      <div>
        <h2>{customerData.name}</h2>
        <p>{customerData.email}</p>
        <h5>{customerData.age}</h5>
      </div>
    );
    setCustomerData({ ...customerData, customerCards: [...customerData.customerCards, customerCard] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="customerName">
          Customer Name:
        </label>
        <input
          type="text"
          name="customerName"
          onChange={handleChange}
        />
        <label htmlFor="customerEmail">
          Customer Email:
        </label>
        <input
          type="text"
          name="customerEmail"
          onChange={handleChange}
        />
        <label htmlFor="customerAge">
          Customer Age:
        </label>
        <input
          type="text"
          name="customerAge"
          onChange={handleChange}
        />
        <button type="submit" className="customer-form__button">
          Submit
        </button>
      </form>
    </div>
  );
}
