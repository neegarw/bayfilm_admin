import { useState, useEffect } from 'react';
import { getFullCategory, getFullSubCategory, createImg } from '../../api/api';
import toast from 'react-hot-toast';
import axiosInstance from '../../config/axiosInstance';

function SubcategoryAdmin() {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [subCategory, setSubCategory] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    // Yeni subcategory əlavə modal state
    const [subType, setSubType] = useState("full");
    const [videoLink, setVideoLink] = useState("");
    const [files, setFiles] = useState([]); // seçilən şəkillər

    // Yeni əlavə: title və description
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const cats = await getFullCategory();
        const subcats = await getFullSubCategory();
        setCategories(cats);
        setSubCategory(subcats)
    }

    const handleFileChange = (e, index) => {
        const newFiles = [...files];
        newFiles[index] = e.target.files[0];
        setFiles(newFiles);
    };

    const handleSave = async () => {
        if (!selectedCategoryId) {
            toast.error("❌ Zəhmət olmasa kateqoriya seçin!");
            return;
        }

        let payload = {
            category_id: selectedCategoryId,
            type: subType,
            title: title,
            description: description,
            items: []
        };

        if (subType === "VIDEO") {
            payload.items.push({ video: videoLink });
        } else {
            for (let i = 0; i < files.length; i++) {
                if (files[i]) {
                    const uploaded = await createImg(files[i]);
                    payload.items.push({ img: uploaded.file.path });
                }
            }
        }

        try {
            const res = await fetch('https://bayfilm.xezernn.com.az/galery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // token varsa
                },
                body: JSON.stringify(payload)
            });
            console.log("Yeni subkateqoriya yaradıldı:", res.data);
            toast.success("✅ Subkateqoriya əlavə edildi!");
            setAddModal(false);
            fetchCategories();
            setTitle("");
            setDescription("");
            setVideoLink("");
            setFiles([]);
        } catch (err) {
            console.error("Subkateqoriya yaratmaqda problem:", err);
            toast.error("❌ Subkateqoriya əlavə etmək mümkün olmadı!");
        }
    };

    return (
        <main className='pt-[30px]'>
            <h1 className='text-center text-[20px] font-[500] my-[20px]'>
                Subkateqoriyalarin əlavə olunmasi formu:
            </h1>
            <section>
                <div className='flex items-center'>
                    <div className="w-full px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Kateqoriya ID yaz
                        </label>
                        <input
                            type="number"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}
                            placeholder="Məs: 5"
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (!selectedCategoryId) {
                                toast.error("❌ Zəhmət olmasa kateqoriya seçin!");
                                return;
                            }

                            // ID-nin subCategory-də olub olmadığını yoxlayırıq
                            const categoryExists = subCategory.some(
                                (sub) => sub.id === Number(selectedCategoryId)
                            );

                            if (!categoryExists) {
                                toast.error("❌ Belə ID-li kateqoriya mövcud deyil!");
                                return;
                            }

                            // Əgər hər şey düzgündürsə, modal açılır
                            setFiles([null]); // burada 1 input üçün array-ə null qoyuruq
                            setTitle("");
                            setDescription("");
                            setVideoLink("");
                            setSubType("ONE"); // modal açılarkən default ONE olsun
                            setAddModal(true);
                        }}
                        className='min-w-[150px] whitespace-nowrap bg-[#188a2f] ml-auto mt-[10px] text-white px-[10px] h-[47px] rounded-[7px] flex justify-center items-center gap-2 cursor-pointer'
                    >
                        + Əlavə et
                    </button>


                </div>
            </section>

            {addModal && (
                <div
                    onClick={() => setAddModal(false)}
                    className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-[#00000070]"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-lg p-6 w-[500px] shadow-lg"
                    >
                        <h2 className="text-xl font-bold mb-4">Yeni Subkateqoriya əlavə et</h2>

                        <label className="block mb-2 font-semibold">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full border p-2 rounded mb-4"
                        />

                        <label className="block mb-2 font-semibold">Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full border p-2 rounded mb-4"
                        />

                        <label className="block mb-2 font-semibold">Tip seçin:</label>
                        <select
                            value={subType}
                            onChange={(e) => {
                                setSubType(e.target.value);
                                setFiles([]);
                                setVideoLink("");
                            }}
                            className="w-full border rounded p-2 mb-4"
                        >
                            <option value="ONE">one</option>
                            <option value="FULL">full</option>
                            <option value="TREE">tree</option>
                            <option value="GRID">grid</option>
                            <option value="VIDEO">video</option>
                        </select>


                        {/* Şəkil/video inputları */}
                        {subType === "ONE" || subType === "FULL" ? (
                            <input type="file" onChange={(e) => handleFileChange(e, 0)} className="block w-full border p-2 rounded mb-2" />
                        ) : null}

                        {subType === "TREE" && (
                            <div className="flex flex-col gap-2 mb-2">
                                {[0, 1, 2].map(i => (
                                    <input key={i} type="file" onChange={(e) => handleFileChange(e, i)} className="flex-1 border p-2 rounded" />
                                ))}
                            </div>
                        )}

                        {subType === "GRID" && (
                            <div className="grid grid-cols-3 gap-2 mb-2">
                                {/* 1-ci setir */}
                                <input type="file" onChange={(e) => handleFileChange(e, 0)} className="col-span-1 border p-2 rounded" />
                                <input type="file" onChange={(e) => handleFileChange(e, 1)} className="col-span-1 border p-2 rounded" />
                                <input type="file" onChange={(e) => handleFileChange(e, 2)} className="col-span-1 border p-2 rounded" />
                                {/* 2-ci setir */}
                                <input type="file" onChange={(e) => handleFileChange(e, 3)} className="col-span-3 border p-2 rounded" />
                            </div>
                        )}

                        {subType === "VIDEO" && (
                            <input
                                type="text"
                                value={videoLink}
                                onChange={(e) => setVideoLink(e.target.value)}
                                placeholder="YouTube video link"
                                className="block w-full border p-2 rounded mb-2"
                            />
                        )}


                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setAddModal(false)}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Ləğv et
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Yadda saxla
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
export default SubcategoryAdmin;
