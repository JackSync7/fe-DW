import { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';

import { ComponentContext } from '../../context/ComponentContext';
import Swal from 'sweetalert2';

const AddEpisode = (props) => {
  // const [message, setMessage] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const params = urlParams.get("id");
  const [_, modalDispatch] = useContext(ComponentContext);
  const [form, setForm] = useState({
    image: '',
    title: '',
    link: '',
    year: '',
    film_id: '',
  });


  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const formData = new FormData();
      formData.set('title', form.title);
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('linkfilm', form.link);
      formData.set('year', form.year);
      formData.set('film_id', params);

      const response = await API.post('/episode', formData, config);
      console.log('add episode success', response);
      console.log("ini params : ", JSON.stringify(params))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Episode Added Success',
        showConfirmButton: false,
        timer: 1500
      })

    } catch (err) {
      console.log(form)
      console.log('add episode failed', err);
      Swal.fire({
        icon: 'error',
        title: 'Ooops.. Something went wrong',
        text: 'Add Episode Failed',
      })
    }
  });

  return (
    <div className="absolute w-full h-full bg-zinc-900  flex justify-center backdrop:blur-lg bg-opacity-80">
      <div className='flex justify-center flex-col px-10 fixed rounded-2xl bg-black h-2/4 w-2/3'>
        <div className="flex justify-evenly ">
          <h2 className="font-semibold mb-5 text-2xl text-white  my-10">Add Episode</h2>
          <button onClick={() => modalDispatch({ type: 'CLOSE_MODAL' })} className='text-4xl absolute top-5 right-16 text-red-700 font-bold'>x</button>
        </div>
        <form className='p-3 flex flex-col justify-center bg-black' onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <div className="flex gap-x-3">
            <input onChange={handleOnChange} className="w-3/4 mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" type="text" name="title" required placeholder="Title" />
            <input onChange={handleOnChange} className="w-1/4 mb-3 rounded-md p-2 placeholder-white border-2 text-black border-white bg-zinc-500 focus:outline-none  file:text-red-600" required type="file" name="image" id="" />
          </div>
          <input onChange={handleOnChange} className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" type="text" name="link" id="" required placeholder="Link Video" />
          <input onChange={handleOnChange} className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" type="text" name="year" id="" required placeholder="Year" />
          <button className="w-full text-white py-2 mb-10 rounded-md mb-2 bg-red-700 font-semibold">Add +</button>
        </form>
      </div>
    </div>
  );
};

export default AddEpisode;