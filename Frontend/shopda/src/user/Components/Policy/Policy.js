import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Policy.css'
const Policy = () => {
    return (
      <section className="policy">
        <Navbar></Navbar>
        <div className="container">
          <h2 className="policy-heading">Chính sách bảo hành & Đổi hàng</h2>
          <div className="policy-list">
            <div className="policy-item">
              <div className="policy-content">
                <h3 className="policy-title">BẢO HÀNH</h3>
                <h4 className='  .policy-title-24'>QUY ĐỊNH BẢO HÀNH:</h4>
                <p className="policy-desc">
                  {' '}
                  Sản phẩm được bảo hành trong suốt quá trình sử dụng theo hình thức sau:
                </p>
                <p className="policy-desc">
                  {' '}
                  <strong>- Bảo hành miễn phí:</strong> Đường chỉ may, nút hít, nút bấm, đầu khoá kéo.
                  <br/>
                  <strong>- Bảo hành tính phí:</strong> DA hỗ trợ 50%, dây kéo, bề mặt da, vải lót, móc chóa, khoen khóa…v…v
                  <br/>
                  <strong>- Thời gian bảo hành:</strong> 2 đến 15 ngày (tùy vào mức độ).  <br/>
                  <strong>- Địa điểm:</strong> Cửa hàng bất kỳ, thuộc hệ thống DA, trên toàn quốc.  <br/>
                  <strong>- Lưu ý:</strong>  <br/>
                  <p className='policy-desc-min'>
                      ● Sản phẩm đã mua sau 07 ngày, sẽ được xử lý lỗi như hàng bảo hành.  <br/>
                      ● Khách thanh toán phí ship 2 chiều, nếu không mang sản phẩm đến trực tiếp tại cửa hàng.
                  </p>
                      
                </p>
                <h4 className='  .policy-title-24'>CÁC TRƯỜNG HỢP TỪ CHỐI BẢO HÀNH:</h4>
                <p className="policy-desc">
                  {' '}
                  1. Sản phẩm <strong> không có logo DA</strong>  được dập chìm trên túi hoặc trên phụ kiện (trường hợp đặc biệt sẽ được xác nhận từ cấp quản lý) <br/>
                  2. Sản phẩm đã<strong> bị hư hỏng nặng</strong> , không thể sửa chữa/ thay thế.<br/>
                  3. Sản phẩm <strong> bị biến dạng</strong>, có mùi hôi nặng không thể khử.<br/>
                </p>
                <h4 className='  .policy-title-24'>HƯỚNG DẪN SỬ DỤNG:</h4>
                <p className="policy-desc">
                  {' '}
                  - Không đựng vật quá nặng, vượt quá công năng, kích thước, trọng lượng cho phép của sản phẩm.<br/>

                  - Không cố kéo dây kéo khi 2 mép dây không khép sát lại vì đựng đồ quá nhiều vượt chức năng của túi.<br/>

                  - Không giật kéo đầu khoá, nút hít đột ngột, sẽ làm gãy răng dây kéo hoặc rách da.<br/>

                  - Bảo quản nơi khô thoáng, tránh tiếp xúc trực tiếp với nơi có nhiệt độ cao trong thời gian dài (bên hông tủ lạnh, cốp xe, gần bếp).<br/>

                  - Dây nịt và ví da bò: Tránh bị côn trùng gặm nhấm, nhất là gián.<br/>
                </p>
              </div>
              <div className="policy-content">
                <h3 className="policy-title">ĐỔI HÀNG</h3>
                <h4 className='  .policy-title-24'>QUY ĐỊNH ĐỔI HÀNG:</h4>
                <p className="policy-desc">
                  {' '}
                  -<strong>01 lần</strong>  duy nhất trong vòng <strong>7 ngày</strong> sau khi xuất hóa đơn.<br/>
                  - Đổi tại chi nhánh đã mua nếu:<br/>
                  <p className='policy-desc-min'> ● Sản phẩm lỗi do nhà sản xuất. <br/>
                  ● Sản phẩm chưa qua sử dụng, còn nametag, không trầy xước, không biến dạng, không có mùi lạ.
                  </p><br/>
                 <strong>- Lưu ý:</strong> <br/>
                 <p className='policy-desc-min'>
                  ● Không hoàn lại tiền chênh lệch khi đổi lấy sản phẩm có giá trị thấp hơn.<br/>
                  ● Không xử lý trả hàng - hoàn tiền.<br/>
                  ● Khách thanh toán phí ship 2 chiều, nếu không mang sản phẩm đến trực tiếp tại cửa hàng.<br/>
                 </p>
                  
                </p>
                <h4 className='policy-title-24'>TRƯỜNG HỢP TỪ CHỐI ĐỔI HÀNG:</h4>
                <p className="policy-desc">
                  {' '}
                  - Sản phẩm đã khắc laser.<br/>
                  - Dây nịt & Dây đồng hồ đã cắt ngắn, đã bấm thêm lỗ .<br/>
                  <strong>HOTLINE: (+84) 901.379.586</strong><br/>
                </p>
                
                <hr></hr>
                <h5 className='policy-font-18'>Bài viết xem thêm</h5>
                <ul className='policy-desc-min'>
                  <li><Link to="#" className='policy-color-black'>● Hướng dẫn mua hàng</Link></li>
                  <li><Link to="#" className='policy-color-black'>● Hướng dẫn đổi trả hàng</Link></li>
                  <li><Link to="#" className='policy-color-black'>● Chính sách vận chuyển</Link></li>
                  <li><Link to="#" className='policy-color-black'>● Câu hỏi thường gặp</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  export default Policy;