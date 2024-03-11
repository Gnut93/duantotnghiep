import React, { useEffect, useState } from 'react';
import './NhapLieu.css';
import NhapSP from './NhapSP/NhapSP';
import NhapLoai from './NhapLoai/NhapLoai';
import NhapMau from './NhapMau/NhapMau';
import NhapHinh from './NhapHinh/NhapHinh';
import NhapDiscout from './NhapDiscout/NhapDiscout';

const NhapLieu = () => {
  useEffect(() => {
    const tabBlock = document.querySelectorAll('.tab-block');
    const handleTabClick = (e) => {
      tabBlock.forEach((item) => item.classList.remove('active'));
      e.target.classList.add('active');

      const tabNumber = e.target.dataset.tab;
      const tabAdditional = document.querySelectorAll('.tab-additional');
      tabAdditional.forEach((item) => {
        item.classList.remove('active');
        if (item.getAttribute('data-tab') === tabNumber) {
          item.classList.add('active');
        }
      });
    };

    tabBlock.forEach((item) => item.addEventListener('click', handleTabClick));

    return () => {
      tabBlock.forEach((item) =>
        item.removeEventListener('click', handleTabClick)
      );
    };
  }, []);
  return (
    <section className="content">
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Nhập Liệu</h1>
          </div>
          <div className="tabs">
            <div className="tab-list">
              <div
                className="tab-block active"
                data-tab="1">
                Thêm sản phẩm
              </div>
              <div
                className="tab-block"
                data-tab="2">
                Thêm loại hàng
              </div>
              <div
                className="tab-block"
                data-tab="3">
                Hình ảnh chi tiết
              </div>
              <div
                className="tab-block"
                data-tab="4">
                Mã màu
              </div>
              <div
                className="tab-block"
                data-tab="5">
                Mã giảm giá
              </div>
            </div>
          </div>
        </div>
        <div
          className="tab-additional active"
          data-tab="1">
          <NhapSP></NhapSP>
        </div>
        <div
          className="tab-additional"
          data-tab="2">
          <NhapLoai></NhapLoai>
        </div>
        <div
          className="tab-additional"
          data-tab="4">
          <NhapMau></NhapMau>
        </div>
        <div
          className="tab-additional"
          data-tab="3">
          <NhapHinh></NhapHinh>
        </div>
        <div
          className="tab-additional"
          data-tab="5">
          <NhapDiscout></NhapDiscout>
        </div>
      </main>
    </section>
  );
};

export default NhapLieu;
