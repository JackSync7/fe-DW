import { useState } from 'react';
import { API } from '../../config/api'
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';


const AddFilm = () => {



    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        title: '',
        year: '',
        thumbnail: '',
        category_id: '',
        link: '',
        description: '',
    });

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
        });
    };

    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.data;
    });

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            console.log(form);
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };

            const formData = new FormData();
            formData.set('image', form.thumbnail[0], form.thumbnail[0].name);
            formData.set('title', form.title);
            formData.set('year', form.year);
            formData.set('link', form.link);
            formData.set('desc', form.description);
            formData.set('category_id', form.category_id);

            const response = await API.post('/film', formData, config);
            console.log('add movie success', response);
            console.log('add', form);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Welcome',
                showConfirmButton: false,
                timer: 1500
            })

        } catch (err) {
            e.preventDefault();
            console.log('add movie failed', err);
            console.log(form);
        }
    });

    return (
        <div className="bg-black container mx-auto pt-28  px-20 h-[100vh]">
            <h2 className="font-bold text-lg text-white mb-5">Add Movie</h2>
            <form className='flex flex-col gap-2' onSubmit={(e) => handleOnSubmit.mutate(e)}>
                <div className=" flex gap-3">
                    <input onChange={handleOnChange} value={form.title} name="title" type="text" className="mb-3 border text-white border-white rounded-md py-2 px-5 bg-zinc-700 w-3/4" placeholder="Title" />

                    <input onChange={handleOnChange} name="thumbnail" type="file" className="mb-3 border text-white border-white rounded-md file:h-full bg-zinc-700 w-1/4" />
                </div>
                <input onChange={handleOnChange} value={form.year} name="year" type="text" className="mb-3 border text-white border-white rounded-md py-2 px-5 bg-zinc-700 w-full" placeholder="Year" />
                <select onChange={handleOnChange} value={form.category_id} name="category_id" className="mb-3 border text-white border-white rounded-md py-2 px-5 bg-zinc-700 w-full">
                    <option className="0" value={2}>
                        Category
                    </option>
                    {categories?.map((index, id) => (
                        <option key={id} value={index?.id}>
                            {index?.name}
                        </option>
                    ))}
                </select>
                <input onChange={handleOnChange} value={form.link} name="link" type="text" className="mb-3 border text-white border-white rounded-md py-2 px-5 bg-zinc-700 w-full" placeholder="Link" />
                <textarea value={form.description} onChange={handleOnChange} name="description" className="mb-3 border text-white border-white rounded-md py-1 px-5 bg-zinc-700 w-full" placeholder="Description"></textarea>

                <div className="text-end">
                    <button className="bg-red-700 text-white px-12 py-2 rounded-md mt-5">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddFilm