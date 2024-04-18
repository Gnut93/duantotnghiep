import React from 'react';
import Navbar from '../Navbar/Navbar';
import './InforUser.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { thoat, capnhatUserInfo } from '../../../authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cloudinaryUpload from '../../../user/service/uploads';
const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Không được bỏ trống')
    .min(2, 'Tên sản phẩm có tối thiểu 2 ký tự')
    .max(20, 'Tên  sản phẩm có tối đa 20 ký tự'),
  email: yup
    .string()
    .email('email có định dạng không hợp lệ')
    .trim()
    .required('Không được bỏ trống'),
  phone: yup
    .string()
    .typeError('Vui lòng nhập một số')
    .min(10, 'Chưa đạt số lượng tối thiểu')
    .required('Không được bỏ trống'),

  image: yup.string(),
  avatar: yup.mixed().test('size', 'Kích thước file quá lớn', (value) => {
    if (!value) return true; // Trường hợp không có file được chọn
    return value.size <= 5242880; // Kích thước file không vượt quá 5MB (5242880 bytes)
  }),
});

const InfoUser = () => {
  const navigate = useNavigate();
  var user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const idUser = user ? user.id_user : null;
  const form = useForm({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
      image: user?.image,
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, reset, formState, control } = form;
  const { errors, isSubmitSuccessful } = formState;

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('file', e.target.files[0], 'file');
    console.log(e.target.files[0]);
    cloudinaryUpload(uploadData)
      .then((res) => {
        console.log(res.secure_url);
        form.setValue('image', res.secure_url);
      })
      .catch((err) => console.error(err));
  };
  const handleSubmitInForUser = async (data) => {
    const id = idUser;
    try {
      const url = `http://localhost:4000/users/update/${id}`;
      const opt = {
        method: 'put',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      };
      const res = await fetch(url, opt);
      const reponseData = await res.json();
      alert('Đã Cập Nhật Thông Tin Thành Công', reponseData);
    } catch (error) {
      console.error('Lỗi khi gửi form: ', error);
    }
  };
  const getInforUser = async () => {
    const id = idUser;
    try {
      const url = `http://localhost:4000/users/info/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      dispatch(capnhatUserInfo({ userInfo: data }));
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng: ', error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      getInforUser();
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleLogout = () => {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem('result');
    // Cập nhật Redux store
    dispatch(thoat());
    navigate('/');
  };

  return (
    <section className="infoUser">
      <Navbar />
      <div className="container">
        <h1 className="infoUer-heading">Thông tin cá nhân</h1>
        <div className="infoUser-wrapper">
          <div className="infoUser-image">
            <img
              src={user?.avatar}
              alt="avatar-user"
            />
            <p className="infoUser-name">{user?.name}</p>
            <p className="infoUser-info">{user?.phone}</p>
            <p className="infoUser-info">{user?.email}</p>
          </div>
          <div className="infoUser-content">
            <form
              onSubmit={handleSubmit(handleSubmitInForUser)}
              noValidate>
              <h3 className="infoUser-title">Thay đổi thông tin cá nhân</h3>
              <div className="infoUser-list">
                <div className="infoUser-item">
                  <label className="infoUser-text">Tên người dùng</label>
                  <input
                    placeholder="Tên"
                    type="text"
                    {...register('name')}
                  />
                  <p className="err">{errors.name?.message}</p>
                </div>
                <div className="infoUser-item">
                  <label className="infoUser-text">Số điện thoại</label>
                  <input
                    placeholder="Số điện thoại"
                    type="text"
                    {...register('phone')}
                  />
                  <p className="err">{errors.phone?.message}</p>
                </div>
                <div className="infoUser-item">
                  <label className="infoUser-text">Email</label>
                  <input
                    placeholder="Email"
                    type="email"
                    {...register('email')}
                  />
                  <p className="err">{errors.email?.message}</p>
                </div>
                <div className="infoUser-item">
                  <label className="infoUser-text">Ảnh đại diện</label>
                  <input
                    type="file"
                    id="avatar"
                    onChange={(e) => handleFileUpload(e)}
                  />
                  <p className="err">{errors.image?.message}</p>
                </div>
              </div>
              <button
                className="infoUser-button"
                type="submit">
                Thay đổi
              </button>
            </form>
            <DevTool control={control} />
          </div>
          <div className="infoUser-packlink">
            <Link to="/reset-pass">
              <p className="infoUser-link">Đổi mật khẩu</p>
            </Link>
            <Link
              to="/"
              onClick={handleLogout}>
              <p className="infoUser-link">Đăng xuất</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoUser;
