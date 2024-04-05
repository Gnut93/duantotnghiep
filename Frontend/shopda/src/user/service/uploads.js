const API_URL = "http://localhost:4000";

const cloudinaryUpload = (file) => {
  return fetch(API_URL + '/upload-image/cloudinary-upload', {
    method: 'POST',
    body: file
  })
  .then(res => res.json())
  .then(data => {
    // Biến 'data' chứa dữ liệu JSON từ máy chủ
    console.log(data);
    return data;
  })
  .catch(err => console.log(err));
}

export default cloudinaryUpload;