import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config/api';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate()
    const { id } = useParams()
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
    // let { data: getData } = useQuery('dataFilm', async () => {
    //     const response = await API.get('/film/' + id);
    //     return response.data.data;
    // });
    const getData = async () => {
        const response = await API.get('/film/' + id)
        setForm(
            {
                title: response.data.data.title,
                year: response.data.data.year,
                thumbnail: response.data.data.thumbnail,
                category_id: response.data.data.category_id,
                link: response.data.data.link,
                description: response.data.data.description,
            }
        )
    }
    useEffect(() => {
        getData()

    }, [])

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

            const response = await API.patch(`/film/${id}`, formData, config);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Welcome',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/film")
        } catch (err) {
            e.preventDefault();
            console.log('Update Film failed', err);
            console.log(form);
        }
    });

    return (
        <div className="bg-black container mx-auto pt-28  px-20 h-[100vh]">
            <h2 className="font-bold text-lg text-white mb-5">Add Movie</h2>
            <form className='flex flex-col gap-2' onSubmit={(e) => handleOnSubmit.mutate(e)}>
                <div className=" flex  items-center justify-between  mb-3">
                    <input onChange={handleOnChange} value={form.title} name="title" type="text" className=" border text-white border-white rounded-md py-2 px-5 bg-zinc-700 w-10/12" placeholder="Title" />
                    <div >
                        <label className="text-white bg-red-600 rounded-md p-2" htmlFor='image' >Choose File</label>
                        <input onChange={handleOnChange} hidden name="thumbnail" id="image" type="file" className="mb-3 border text-white border-white rounded-md file:h-full bg-zinc-700 w-1/4" />
                    </div>
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
                    <button className="bg-red-700 text-white px-12 py-2 rounded-md mt-5">Update</button>
                </div>
            </form>
        </div>
    );
};


export default Update