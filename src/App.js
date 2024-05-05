import './App.css';
import { EmployeeData } from './employeeData';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find(item => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setEmail(dt.email);
      setPassword(dt.password);
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';
    if (!firstName)
      error += 'firstName is required..';
    if (!lastName)
      error += 'lastName is required..';
    if (!email)
      error += 'email is required..';

    if (error !== '') {
      console.error("Validation Error:", error);
      return;
    }

    const newObj = {
      id: data.length + 1,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    const newData = [...data, newObj];
    setData(newData);
    handleClear();
  }

  const handleUpdate = () => {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      const updatedData = [...data];
      updatedData[index] = {
        ...updatedData[index],
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      setData(updatedData);
      handleClear();
    }
  }

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setIsUpdate(false);
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
      handleClear();
    }
  }

  return (
    <div className='App'>
      <div className='input-fields'>
        <label>firstName:
          <input type='text' placeholder='Enter firstName' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        </label>
        <label>lastName:
          <input type='text' placeholder='Enter lastName' onChange={(e) => setLastName(e.target.value)} value={lastName} />
        </label>
        <label>email:
          <input type='text' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </label>
        <label>password:
          <input type='text' placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </label>
      </div>

      {
        !isUpdate ?
          <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button> :
          <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
      }
      <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
