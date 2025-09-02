import { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { getFullCategory, createCategory, createImg, deleteCategoryById, editCategoryById } from '../../api/api';

function CategoryAdmin() {
  const [deletePopup, setDeletePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ❌ error mesajı üçün

  // yeni kateqoriya üçün state
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    fullCategory();
  }, []);

  async function fullCategory() {
    const allCategory = await getFullCategory();
    setCategory(allCategory);
  }

  // şəkil seçiləndə həm faylı, həm də preview-u yadda saxla
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // post sorğusu
  const handleSubmit = async () => {
    if (!title) {
      setError("Zəhmət olmasa başlıq daxil edin!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      let imgUrl = preview; // default əvvəlki şəkil qalır
      if (image) {          // yeni şəkil seçilibsə upload et
        const imgResponse = await createImg(image);
        imgUrl = imgResponse.file.path;
      }

      const data = { title, image: imgUrl };

      if (editId) {
        await editCategoryById(editId, data);
        alert("Kateqoriya yeniləndi ✅");
      } else {
        await createCategory(data);
        alert("Kateqoriya əlavə olundu ✅");
      }

      // resetlə
      setAddPopup(false);
      setTitle("");
      setImage(null);
      setPreview(null);
      setEditId(null);
      fullCategory();

    } catch (err) {
      console.error(err);
      setError("Xəta baş verdi ❌");
    } finally {
      setLoading(false);
    }
  };


  // kateqoriyanı sil
  const handleDelete = async (id) => {
    if (!window.confirm("Kateqoriyanı silmək istədiyinizə əminsiniz?")) return;

    try {
      setLoading(true);
      await deleteCategoryById(id);
      alert("Kateqoriya silindi ✅");
      fullCategory(); // state-i yenilə
    } catch (err) {
      console.error(err);
      setError("Kateqoriyanı silmək mümkün olmadı ❌");
    } finally {
      setLoading(false);
    }
  };
  //edit funksiyası
  const handleEdit = (item) => {
    setEditId(item.id);           // hansını edit edirik
    setTitle(item.image);         // input-a hazır title gəlsin
    setPreview(item.title);       // şəkil əvvəlcədən görünsün
    setAddPopup(true);            // modal açılsın
  };


  return (
    <main>
      <h1 className="text-center text-[20px] font-[500] my-[20px]">
        Kateqoriyaların idarə olunması formu:
      </h1>
      <div>
        <button
          onClick={() => setAddPopup(true)}
          className="bg-[#188a2f] ml-auto my-[20px] text-white px-[10px] rounded-[7px] min-h-[40px] min-w-[40px] flex justify-center items-center gap-2 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Yüklənir..." : "+ Kateqoriya əlavə et"}
        </button>
      </div>

      {/* Category table */}
      <section className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Kateqoriyanın adı
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Düzəlişlər paneli
              </th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? (
              category.map((item, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.image}
                  </th>
                  <td className="px-6 py-4 text-right flex gap-6 text-[25px] font-medium text-blue-500 hover:underline">
                    <BiEdit
                      onClick={() => handleEdit(item)}
                      className="ml-auto cursor-pointer"
                    />

                    <MdDeleteForever
                      onClick={() => handleDelete(item.id)}
                      className="cursor-pointer text-[red]"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th className="px-6 py-4">Kateqoriyalar mövcud deyil</th>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Yeni Kateqoriya əlavə etmək üçün Modal */}
      <div
        onClick={() => setAddPopup(false)}
        style={{ display: addPopup ? "flex" : "none" }}
        className="fixed top-0 left-0 right-0 z-50 items-center bg-[#00000060] justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-[100%]"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-[400px] bg-white rounded-lg shadow-lg p-6 w-full"
        >
          <h3 className="text-xl font-semibold mb-4">Yeni Kateqoriya əlavə et</h3>

          {/* Error mesajı */}
          {error && (
            <p className="text-red-600 mb-3 font-medium text-sm">{error}</p>
          )}

          <input
            type="text"
            placeholder="Başlıq"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-3"
          />

          {/* Preview şəkil */}
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                className="max-h-40 rounded border"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setAddPopup(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Ləğv et
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Yüklənir..." : "Yadda saxla"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CategoryAdmin;
