import { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';

import { ComponentContext } from '../../context/ComponentContext';
import Swal from 'sweetalert2';

const AddCategory = (props) => {
  // const [message, setMessage] = useState(null);
  const [_, modalDispatch] = useContext(ComponentContext);
  const [form, setForm] = useState({
    name: '',

  });


  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post('/category', form);
      console.log('add Category success', response);
      console.log(form);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Category Added Success',
        showConfirmButton: false,
        timer: 1500
      })

    } catch (err) {
      console.log(form.name)
      console.log('add Category failed', err);
      Swal.fire({
        icon: 'error',
        title: 'Ooops.. Something went wrong',
        text: 'Add Category Failed',
      })
    }
  });

  return (
    <div className="absolute w-full h-full bg-zinc-900  flex justify-center z-10 backdrop:blur-lg bg-opacity-80">
      <div className='flex justify-center flex-col px-10 fixed rounded-2xl bg-black h-64 w-2/3'>
        <div className="flex justify-evenly ">
          <h2 className="font-semibold mb-5 text-2xl text-white  my-10">Add Category</h2>
          <button onClick={() => modalDispatch({ type: 'CLOSE_MODAL' })} className='text-4xl absolute top-5 right-16 text-red-700 font-bold'>x</button>
        </div>
        <form className='p-3 flex flex-col justify-center bg-black' onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="flex gap-x-3">
            <input onChange={handleOnChange} value={form.name} className="w-full mb-3 rounded-md p-2 text-white placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" type="text" name="name" required placeholder="Category" />

          </div>

          <button type="submit" className="w-full text-white py-2 mb-10 rounded-md mb-2 bg-red-700 font-semibold">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;