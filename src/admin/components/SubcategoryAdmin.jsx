import { useState, useEffect } from 'react';
import { getFullCategory, getFullCSubcategory } from '../../api/api';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';

function SubcategoryAdmin() {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [subCategory, setSubCategory] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const cats = await getFullCategory();
        const subcats = await getFullCSubcategory();
        setCategories(cats);
        setSubCategory(subcats)
    }



    return (
        <main className='pt-[30px]'>
            <h1 className='text-center text-[20px] font-[500] my-[20px]'>Subkateqoriyalarin əlavə olunmasi formu:</h1>
            <section>
                <div className='flex items-center'>
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category-select">
                            Kateqoriya seçin
                        </label>
                        <select
                            id="category-select"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                        >
                            <option value="">Kateqoriya seçin</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name_az}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={() => setAddModal(true)}
                        className='min-w-[150px] whitespace-nowrap bg-[#188a2f] ml-auto mt-[10px] text-white px-[10px] h-[47px] rounded-[7px] min-h-[45px] flex justify-center items-center gap-2 cursor-pointer'
                    >
                        + Əlavə et
                    </button>
                </div>
            </section>

            <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" colSpan={4} className="px-6 py-4 text-center text-[22px] text-white">
                                Subkateqoriyalar siyahısı!
                            </th>
                        </tr>
                        <tr className='text-white'>
                            <th scope="col" className="px-6 py-3">Ad</th>
                            <th scope="col" className="px-6 py-3">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subCategory?.length === 0 ? (
                            <tr className="cursor-pointer bg-white border-b border-gray-700 hover:bg-gray-200">
                                <th colSpan={4} scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                    Subkateqoriya mövcud deyil
                                </th>
                            </tr>
                        ) : (
                            subCategory?.map((item, i) => {
                                return (
                                    <tr key={i} className="cursor-pointer bg-white border-b border-gray-700 hover:bg-gray-200">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                            Az - {item.name_az} <br />
                                            En - {item.name_en} <br />
                                            Ru - {item.name_ru}
                                        </th>
                                        <td className="px-6 pr-0 py-4">
                                            <div className="flex gap-4 text-[20px] font-medium text-blue-500 hover:underline">
                                                <BiEdit className='cursor-pointer'
                                                    onClick={() => openEditModal(item.id)}
                                                />
                                                <MdDeleteForever
                                                    className='cursor-pointer text-[red]'
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </section>

            {/* Delete Confirmation Modal */}
            <div
                style={{
                    display: deleteModal ? "flex" : "none"
                }}
                onClick={() => setDeleteModal(!deleteModal)}
                className="fixed top-0 left-0 right-0 z-50 items-center bg-[#00000028] justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full"
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-2xl max-h-full"
                >
                    <div className="relative min-h-[200px] py-[30px] bg-white rounded-lg shadow ">
                        <div className="flex items-start mb-[30px] justify-between p-4 border-b rounded-t border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Subkateqoriyanı <span className='text-red-700'>silmək</span> istədiyinizə əminsiz?
                            </h3>
                            <button
                                onClick={() => setDeleteModal(!deleteModal)}
                                type="button"
                                className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:text-[red]"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className='flex justify-end gap-[10px] p-6'>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                                onClick={() => setDeleteModal(!deleteModal)}
                            >
                                Xeyr
                            </button>
                            <button
                                type="button"
                                className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Bəli
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SubcategoryAdmin;
