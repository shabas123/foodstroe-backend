import { useState } from 'react';
import { addItemAPI } from '../local/api';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-bootstrap';
import { Bounce, toast } from 'react-toastify';
import { addItem } from '../actions/itemAction';

function AddItemForm() {
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    name: '',
    varients: [],
    prices: {
      small: '',
      medium: '',
      large: '',
    },
    category: '',
    image: '',
  });

  const variantOptions = ['small', 'medium', 'large'];
  const categoryOptions = ['Pizza', 'Burger', 'Sandwich', 'Pasta', 'Salad', 'Sides', 'Dessert'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setItem(prev => ({ ...prev, varients: selected }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, varients, prices, category, image } = item;

    if (!name || !varients.length || !prices.small || !prices.medium || !prices.large || !category || !image) {
      alert('Please fill in all required fields');
      return;
    }
    dispatch(addItem(item));

    try {
      const payload = { ...item, prices: [prices] };
      console.log("Sending to API:", payload);

      const result = await addItemAPI(payload);
      console.log("API response:", result);

      if (result.status === 200) {
        toast.success('Item Added Successfully!');
        setItem({
          name: '',
          varients: [],
          prices: {
            small: '',
            medium: '',
            large: '',
          },
          category: '',
          image: '',
        });
      } else if (result.status === 406) {
        toast.warning(result.response?.data || 'Validation error');
      } else {
        toast.warning('Something went wrong: ' + (result.status || 'No status'));
      }
    } catch (err) {
      console.error("Error occurred:", err);
      toast.warning('Something went wrong: ' + (err.response?.data || err.message));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-black p-4 rounded shadow">
        <table className="table table-bordered w-100 text-center align-middle">
          <tbody>
            <tr>
              <th>Name</th>
              <td>
                <input
                  name="name"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </td>
            </tr>

            <tr>
              <th>Variants</th>
              <td>
                <select
                  multiple
                  value={item.varients}
                  onChange={handleVariantChange}
                  className="form-control"
                  required
                >
                  {variantOptions.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <th>Prices</th>
              <td>
                <div className="d-flex flex-column gap-2">
                  {variantOptions.map((v) => (
                    <input
                      key={v}
                      type="number"
                      name={v}
                      placeholder={`${v} price`}
                      value={item.prices[v]}
                      onChange={handlePriceChange}
                      className="form-control"
                      required
                    />
                  ))}
                </div>
              </td>
            </tr>

            <tr>
              <th>Category</th>
              <td>
                <select
                  name="category"
                  value={item.category}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <th>Image URL</th>
              <td>
                <input
                  name="image"
                  placeholder="Image URL"
                  value={item.image}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                {item.image && (
                  <div className="mt-2">
                    <img src={item.image} alt="Preview" className="img-thumbnail" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                  </div>
                )}
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <button type="submit" className="btn btn-success w-100">
                  Add Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default AddItemForm;
