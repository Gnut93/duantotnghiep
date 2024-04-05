import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Questions.css'
const Questions = () => {
  return (
    <section className="quest">
      <Navbar></Navbar>
      <div className="container">
        <h2 className="quest-heading">Câu hỏi thường gặp</h2>
        <div className="quest-list">
          <div className="quest-item">
            <div className="quest-content">
              <h4 className='quest-title-24'>1. Tôi có thể đến đâu để xem hàng trực tiếp?</h4>
              <p className="quest-desc">
                {' '}
                Trả lời: DA hiện có chi nhánh ở TP.HCM, để xem chi tiết thông tin cửa hàng bạn có thể nhấn xem tại: <a href='https://by.tn/cuhk'>https://by.tn/cuhk</a>
              </p>
              <h4 className='quest-title-24'>2. Những hình thức thanh toán nào được công ty chấp nhận?</h4>
              <p className="quest-desc">
                {' '}
                Trả lời:<br />
                - Khi mua hàng tại cửa hàng bạn có thể thanh toán bằng tiền mặt hoặc sử dụng thẻ thanh toán ( ATM nội địa, MasterCard, Visa).<br />
                - Khi mua mua hàng tại hệ thống website, Quý khách có thể thanh toán tiền mặt sau khi nhận hàng hoặc chuyển khoản ngân hàng.
                 Đối với một số khu vực tuyến huyện vùng sâu, vùng xa,
                thực hiện gửi hàng qua bưu điện khách hàng cần thanh toán tiền sản phẩm trước. Chi tiết xem tại đây.
              </p>
              <h4 className='quest-title-24'>3. Vận chuyển hàng sẽ mất bao lâu?</h4>
              <p className="quest-desc">
                {' '}
                Trả lời: Thời gian vận chuyển hàng phụ thuộc vào khu vực nhận hàng và gói cước dịch vụ quý khách sử dụng. <Link to="/trans">Chi tiết xem tại đây.</Link> 
              </p>
              <h4 className='quest-title-24'>4. Tôi có thể đổi trả hàng như thế nào?</h4>
              <p className="quest-desc">
                {' '}
                Trả lời:  Trong vòng 7 ngày kể từ ngày mua/nhận hàng, sản phẩm muốn đổi phải còn mới,
                chưa sử dụng, giặt ủi, không bị dơ bẩn, có mùi hôi…
                Nếu không hài lòng về sản phẩm hay có nhu cầu đổi mẫu mã khác quý khách vui lòng làm theo quy trình sau:
                Trường hợp quý khách mua hàng tại cửa hàng  có thể đến trực tiếp chi nhánh đã mua để đổi hàng.
                Nếu sản phẩm được mua qua website và ship tận nơi, quý khách có thể liên hệ trực tiếp hotline (+84) 901.379.586
                để được hỗ trợ đổi hàng hoặc <Link to="/changegoods">xem chi tiết tại đây.</Link> 
              </p>
            </div>
            <h4 className='quest-title-24'>5. Hàng gửi đổi trả sẽ mất bao lâu để xử lí?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời: Sau khi nhận được hàng quý khách đã trả về kho hàng,
              chúng tôi sẽ xử lí và liên hệ với quý khách trong 1 ngày làm việc.
            </p>
            <h4 className='quest-title-24'>6. Chi phí cho việc đổi trả hàng?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời:<br />
              - Khách hàng chịu mọi chi phí vận chuyển ( hoàn trả và đổi mới ) nếu vì lý do chủ quan từ khách hàng.<br />
              - DA sẽ hỗ trợ phí vận chuyển để khách hàng đổi sản phẩm mới nếu vì lý do lỗi kĩ thuật, không hỗ trợ chi phí trả hàng.
            </p>
            <h4 className='quest-title-24'>7. Tôi mua nhiều có được giảm giá không?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời: Giá sản phẩm của DA là giá niêm yết ngoài các chương trình khuyến mãi khác thì giá mua không thay đổi.
            </p>
            <h4 className='quest-title-24'>8. Chất liệu các sản phẩm DA gia công là gì?</h4>
            <p className="quest-desc">
              {' '}Trả lời: Các sản phẩm túi DA
              làm từ da tổng hợp (simili giả da cao cấp),
              không bị bong tróc hay gãy dộp, có những đặc tính như da thật
              là qua thời gian sử dụng sẽ lên màu sậm hơn,
              mềm, dẻo và bóng hơn. Sản phẩm được bảo hành suốt quá trình sử dụng
              không kể thời gian. Ngoài ra các sản phẩm như dây nịt, ví nam, case
              ipad được làm từ DA BÒ THẬT nhập khẩu và da công tại xưởng.

            </p>
            <h4 className='quest-title-24'>9. Túi tôi mua có bị hư bị sờn không và có thể sử dụng bao lâu?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời Thời gian sử dụng còn tùy thuộc và người dùng nhưng
              đặc tính túi DA là trên bề mặt ko bị thấm nước,
              chất da dùng lâu sẽ lên màu sẫm hơn, có độ dẻo hơn và bóng lên.
              Không có dấu hiệu bong tróc, gãy dộp hay phân huỷ.
              Để tạo sự tin tưởng hơn khách có thể vào fanpage xem phần feedback của khách hàng cũng như tham khảo các đối tượng
              khách hàng cũ đã từng dùng sản phẩm chia sẻ nhé!

            </p>
            <h4 className='quest-title-24'>10. Túi bị hư hỏng, tôi có thể mang đến bảo hành ở đâu?</h4>
            <p className="quest-desc">
              {' '}Trả lời: Nếu cần hỗ trợ bảo hành sữa chửa khách hàng có thể mang đến chi nhánh
              cửa hàng tại Công viên phần mềm Quang Trung, Quận 12 Tp. Hồ Chí Minh.

            </p>
            <h4 className='quest-title-24'>11. Túi bị hỏng và tôi mang để bảo hành tôi có phải chi trả chi phí nào không?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời: DA SẼ BẢO HÀNH MIỄN PHÍ các sản phẩm trong suốt quá trình sử dung  (như chỉ may, đầu khóa dây kéo, nút hít...)
              Lưu ý: với một số phụ kiện như móc chó, nút gài … với giá thành cao DA sẽ hỗ trợ bạn 50% phí khi thay mới.
              Nếu trường hợp da của túi bị rách, lủng cũng có thể vá lại mà vẫn mang tính thẩm mỹ cao.

            </p>
            <h4 className='quest-title-24'>12. Tôi cần thông tin liên hệ của chi nhánh "xxx" ( bản đồ/ địa chỉ/ số điện thoại/fanpage)</h4>
            <p className="quest-desc">
              {' '}
              Trả lời: Bạn có thể xem tại <a href='https://by.tn/cuhk'>link này</a> .
            </p>
            <h4 className='quest-title-24'>13. Tôi sử dụng sản phẩm đã lâu, tôi muốn vệ sinh cặp như thế nào?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời: Túi DA bề mặt không bị thấm nước nên khi sử dụng nếu dơ bề mặt bạn có thể dùng khăn ướt lau qua sẽ sạch, còn trường hợp túi bị dơ bên trong bạn muốn tổng vệ sinh có thể giặt túi như bình thường, dùng xà phòng giặt ( không dùng chất tẩy rửa quá mạnh ) giặt như quần áo, mình có thể dùng bàn chải chà sạch những vết bẩn rồi xả lại với nước thường cho sạch, nếu muốn thơm hơn cũng có thể xả qua với nước xả vải, sau đó bạn mang ra phơi nắng cho khô ráo, lưu ý là nên lộn ngược mặt trong túi ra bên ngoài để phơi nhanh khô tránh tình trạng bị ẩm móc, hôi bạn nhé!
            </p>
            <h4 className='quest-title-24'>14. Tôi mua sản phẩm ở chi nhánh A nhưng vì nhà tôi gần chi nhánh B, tôi có thể đến chi nhánh B để đổi hàng không?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời: DA hỗ trợ bảo hành trong tất cả các chi nhánh, tuy nhiên việc đổi/trả sản phẩm bạn vui lòng đến trực tiếp chi nhánh đã mua để được hỗ trợ nhé!
            </p>
            <h4 className='quest-title-24'>15. Tôi sống ở Hà Nội, nhưng sản phẩm tôi muốn mua các chi nhánh ở Hà Nội đã hết hàng, ở chi nhánh Cần Thơ còn sản phẩm đấy, liệu tôi có thể nhờ gửi
              hàng đến chi nhánh Hà Nội rồi tới thanh toán không?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời: Không được ạ. Đối với các đơn hàng giao qua dịch vụ vận chuyển, hoặc mua hàng từ chi nhánh khác, việc giao dịch được thực hiện trực tiếp từ chi nhánh (bán sản phẩm) với khách hàng, thông qua công ty vận chuyển, tiền thanh toán khách hàng sẽ chuyển trực tiếp cho phía chi nhánh hoặc thanh toán khi nhận hàng, không thông qua 1 chi nhánh khác tại địa phương khách mua hàng.
            </p>
            <h4 className='quest-title-24'>16. Tôi muốn khắc chữ (hình) lên sản phẩm, có thể lấy liền được không?</h4>
            <p className="quest-desc">
              {' '}
              rả lời: Quý khách vui lòng để lại sản phẩm khắc tại cửa hàng để thực hiện khắc từ 2 - 3 ngày. Trường hợp gấp hơn quý khách có thể tự thương lượng với nhân viên cửa hàng về thời gian hoàn thành sản phẩm
            </p>
            <h4 className='quest-title-24'>17. Tôi khắc 1 bài thơ lên túi được không?</h4>
            <p className="quest-desc">
              {' '}
              Phí khắc chữ là 50.000 VNĐ cho 1 vị trí khắc/ sản phẩm, tối đa không quá 15 chữ. Nếu số lượng chữ nhiều hơn thì tính theo lượng chữ quy thành tiền.
            </p>
            <h4 className='quest-title-24'>18. Tôi có hình riêng của mình (hình vẽ, hình xăm, hình màu...) có khắc được lên túi không?</h4>
            <p className="quest-desc">
              {' '}
              Trả lời: DA nhận khắc các hình theo yêu cầu của khách hàng nếu quý khách cung cấp sẵn file hình trắng đen theo mẫu, kích thước - dung lượng ảnh không quá thấp, ngoài ra các hình khách hàng yêu DA design theo ý thích sẽ được tính phu thu phí design.
              Để được hỗ trợ rõ hơn bạn có thể gửi hình muốn khắc về email: dashop2024@gmail.com
            </p>
            <hr></hr>
            <h5 className='quest-font-18'>Bài viết xem thêm</h5>
            <ul className='quest-desc-min'>
              <li><Link to="/shopguide" className='quest-color-black'>● Hướng dẫn mua hàng</Link></li>
              <li><Link to="/changegoods" className='quest-color-black'>● Hướng dẫn đổi trả hàng</Link></li>
              <li><Link to="/trans" className='quest-color-black'>● Chính sách vận chuyển</Link></li>
              <li><Link to="/policy" className='quest-color-black'>● Chính sách bảo hành & Đổi hàng</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Questions;