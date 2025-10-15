export default function AvatarUpload() {
  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>Загрузка аватара</h2>
      <form>
        {/* Поле выбора файла */}
        <input type="file" accept="image/*" />
        <br />

        {/* Превью аватара */}
        <div style={{ marginTop: "10px" }}>
          <img
            src="https://via.placeholder.com/150" // временный аватар
            alt="Preview"
            style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
          />
        </div>

        {/* Кнопка загрузки */}
        <button type="submit" style={{ marginTop: "10px" }}>
          Загрузить
        </button>
      </form>
    </div>
  );
}
